"""Client for interacting with local Ollama service running Google's Gemma models."""
import json
import logging
import re
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple

import httpx

from .config import settings
from .models import BonusGrassChallenge, MissionRequest, MissionResponse, MissionTask
from .prompts import SYSTEM_PROMPT, build_mission_prompt

logger = logging.getLogger("trailmate.ollama")


class OllamaClientError(Exception):
    """Base exception for Ollama interactions."""
    def __init__(self, message: str, remedy: Optional[str] = None, code: str = "OLLAMA_ERROR"):
        super().__init__(message)
        self.message = message
        self.remedy = remedy
        self.code = code


class OllamaConnectionError(OllamaClientError):
    """Raised when Ollama daemon is unreachable."""
    def __init__(self, message: str = "Cannot connect to local Ollama server"):
        remedy = "Start Ollama by running 'ollama serve' in your terminal, or launch the Ollama desktop app."
        super().__init__(message, remedy=remedy, code="OLLAMA_UNREACHABLE")


class OllamaModelNotFoundError(OllamaClientError):
    """Raised when Gemma model is not installed locally in Ollama."""
    def __init__(self, model_name: str, available_models: List[str]):
        msg = f"Requested open-weight model '{model_name}' is not downloaded in Ollama."
        remedy = f"Pull the model locally by running: 'ollama pull {model_name}'"
        super().__init__(msg, remedy=remedy, code="MODEL_NOT_FOUND")
        self.model_name = model_name
        self.available_models = available_models


class OllamaClient:
    def __init__(self, base_url: Optional[str] = None):
        self.base_url = (base_url or settings.OLLAMA_BASE_URL).rstrip("/")
        self.preferred_model = settings.OLLAMA_MODEL
        self.fallback_models = settings.FALLBACK_MODELS
        self.timeout = settings.GENERATION_TIMEOUT

    async def get_status(self) -> Tuple[bool, List[str], Optional[str]]:
        """
        Check if Ollama server is running and return list of installed model names,
        along with the active Gemma model found (if any).
        """
        url = f"{self.base_url}/api/tags"
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                res = await client.get(url)
                if res.status_code == 200:
                    data = res.json()
                    raw_models = data.get("models", [])
                    installed = [m.get("name", "") for m in raw_models if "name" in m]
                    active_model = self._resolve_model(installed)
                    return True, installed, active_model
                return False, [], None
        except (httpx.ConnectError, httpx.TimeoutException, Exception) as exc:
            logger.debug(f"Ollama connection check failed: {exc}")
            return False, [], None

    def _resolve_model(self, installed: List[str]) -> Optional[str]:
        """Find the best matching Gemma model from installed models."""
        installed_lower = [m.lower() for m in installed]
        
        # 1. Exact or prefix match with preferred model
        pref = self.preferred_model.lower()
        for idx, m in enumerate(installed_lower):
            if m == pref or m.startswith(pref) or pref.startswith(m):
                return installed[idx]

        # 2. Check fallback models in priority order
        for fallback in self.fallback_models:
            fb = fallback.lower()
            for idx, m in enumerate(installed_lower):
                if m == fb or m.startswith(fb):
                    return installed[idx]

        # 3. Check any model containing 'gemma'
        for idx, m in enumerate(installed_lower):
            if "gemma" in m:
                return installed[idx]

        return None

    def _extract_json(self, raw_text: str) -> Dict[str, Any]:
        """Robustly extract and parse a JSON object from LLM response text."""
        cleaned = raw_text.strip()
        logger.info(f"Ollama raw output length: {len(cleaned)} chars")

        # 1. Try stripping markdown code fences if present
        fence_match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", cleaned)
        candidate = fence_match.group(1).strip() if fence_match else cleaned

        # 2. Direct parse attempts
        for text in [candidate, cleaned]:
            try:
                return json.loads(text, strict=False)
            except Exception:
                pass

        # 3. Extract between outer braces { ... }
        start = candidate.find("{")
        if start != -1:
            end = candidate.rfind("}")
            if end > start:
                snippet = candidate[start : end + 1]
                snippet_fixed = re.sub(r",\s*([}\]])", r"\1", snippet)
                try:
                    return json.loads(snippet_fixed, strict=False)
                except Exception:
                    pass

            # 4. Truncation / unclosed bracket repair
            sub = candidate[start:]
            sub = re.sub(r",\s*$", "", sub.strip())
            # Close unclosed quote if odd number of unescaped quotes
            quote_count = len(re.findall(r'(?<!\\)"', sub))
            if quote_count % 2 != 0:
                sub += '"'
            open_curly = sub.count("{") - sub.count("}")
            open_square = sub.count("[") - sub.count("]")
            repaired = sub + ("]" * max(0, open_square)) + ("}" * max(0, open_curly))
            repaired = re.sub(r",\s*([}\]])", r"\1", repaired)
            try:
                return json.loads(repaired, strict=False)
            except Exception as exc:
                logger.warning(f"Repair attempt failed: {exc}. Raw snippet: {cleaned[:300]}")

        raise OllamaClientError(
            "Could not parse valid JSON from Gemma model output.",
            remedy="Gemma output did not conform to JSON. Check prompt or model temperature.",
            code="JSON_PARSE_ERROR",
        )

    async def generate_mission(self, request: MissionRequest) -> MissionResponse:
        """
        Generate a personalized outdoor mission by sending a prompt
        to the local Gemma model via Ollama.
        """
        # Step 1: Health & model resolution check
        is_online, installed, active_model = await self.get_status()
        if not is_online:
            raise OllamaConnectionError()

        target_model = active_model or self.preferred_model
        
        # Verify if model is present in installed models
        model_installed = any(
            target_model.lower() in m.lower() or m.lower().startswith(target_model.lower())
            for m in installed
        )
        if not model_installed and not active_model:
            raise OllamaModelNotFoundError(self.preferred_model, installed)

        actual_model = active_model or target_model
        prompt = build_mission_prompt(request)

        # Step 2: Query Ollama /api/generate
        payload = {
            "model": actual_model,
            "prompt": prompt,
            "system": SYSTEM_PROMPT,
            "stream": False,
            "format": "json",  # Ollama supports format=json to enforce strict JSON output
            "options": {
                "temperature": 0.65,
                "top_p": 0.85,
                "top_k": 30,
                "num_ctx": 1536,
                "num_predict": 700,
            },
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json=payload,
                )
        except httpx.ConnectError:
            raise OllamaConnectionError()
        except httpx.TimeoutException:
            raise OllamaClientError(
                f"Generation timed out after {self.timeout}s while waiting for Gemma.",
                remedy="Try reducing parameters or ensure your machine has sufficient CPU/RAM for local inference.",
                code="GENERATION_TIMEOUT",
            )
        except Exception as exc:
            raise OllamaClientError(
                f"Failed to communicate with Ollama: {str(exc)}",
                code="OLLAMA_CALL_FAILED",
            )

        if response.status_code != 200:
            error_text = response.text
            if response.status_code == 404 or "not found" in error_text.lower():
                raise OllamaModelNotFoundError(actual_model, installed)
            raise OllamaClientError(
                f"Ollama returned HTTP {response.status_code}: {error_text}",
                code=f"HTTP_{response.status_code}",
            )

        data = response.json()
        raw_output = data.get("response", "")
        if not raw_output:
            raise OllamaClientError("Gemma returned an empty response.", code="EMPTY_RESPONSE")

        # Step 3: Parse and validate JSON
        parsed_json = self._extract_json(raw_output)

        # Build structured tasks
        raw_tasks = parsed_json.get("tasks", [])
        tasks: List[MissionTask] = []
        for idx, t in enumerate(raw_tasks, start=1):
            if isinstance(t, str):
                tasks.append(
                    MissionTask(
                        id=idx,
                        title=f"Step {idx}",
                        description=t,
                        sensory_focus="Sight & Sound",
                        screen_free_tip="Keep phone tucked away",
                        touch_grass_points=25,
                    )
                )
            elif isinstance(t, dict):
                tasks.append(
                    MissionTask(
                        id=t.get("id", idx),
                        title=t.get("title", f"Step {idx}"),
                        description=t.get("description", "Venture outside and explore"),
                        sensory_focus=t.get("sensory_focus", "Sensory Awareness"),
                        screen_free_tip=t.get("screen_free_tip", "Pocket your device"),
                        touch_grass_points=int(t.get("touch_grass_points", 25)),
                    )
                )

        if not tasks:
            # Fallback minimum tasks if model produced malformed task list
            tasks = [
                MissionTask(
                    id=1,
                    title="Venture Outdoors",
                    description=f"Begin your {request.time_minutes}-minute {request.activity} session by heading out into the open air.",
                    sensory_focus="Fresh Air Breath",
                    screen_free_tip="Put phone on silent",
                    touch_grass_points=25,
                ),
                MissionTask(
                    id=2,
                    title="Find Natural Flora",
                    description="Spot three distinct living plants, trees, or greenery along your path.",
                    sensory_focus="Sight: Color & Veins",
                    screen_free_tip="Observe without taking a photo first",
                    touch_grass_points=35,
                ),
            ]

        raw_bonus = parsed_json.get("bonus_challenge", {})
        if isinstance(raw_bonus, dict):
            bonus = BonusGrassChallenge(
                title=raw_bonus.get("title", "Grounding Ritual"),
                description=raw_bonus.get(
                    "description",
                    "Place your bare hands on living grass, moss, or natural soil for 30 seconds."
                ),
                points=int(raw_bonus.get("points", 50)),
            )
        else:
            bonus = BonusGrassChallenge(
                title="Grounding Ritual",
                description="Place your bare hands on living grass or natural soil for 30 seconds.",
                points=50,
            )

        total_points = sum(t.touch_grass_points for t in tasks) + bonus.points

        return MissionResponse(
            id=f"mission_{uuid.uuid4().hex[:10]}",
            title=parsed_json.get("title", f"{request.activity.title()} Expedition"),
            tagline=parsed_json.get("tagline", "Unplug, explore the physical world, and reconnect with the earth."),
            duration_minutes=request.time_minutes,
            activity=request.activity,
            difficulty=request.difficulty,
            companion=request.companion,
            environment=parsed_json.get("environment", request.environment or "Outdoors"),
            mindset_quote=parsed_json.get(
                "mindset_quote",
                "Almost everything will work again if you unplug it for a few minutes, including you."
            ),
            safety_tip=parsed_json.get(
                "safety_tip",
                "Stay hydrated, respect private property, and be aware of your physical surroundings."
            ),
            tasks=tasks,
            bonus_challenge=bonus,
            total_potential_points=total_points,
            model_used=actual_model,
            generated_at=datetime.now(timezone.utc).isoformat(),
        )


ollama_client = OllamaClient()
