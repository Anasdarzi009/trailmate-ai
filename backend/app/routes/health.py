"""Health and AI diagnostics routes."""
from fastapi import APIRouter
from ..config import settings
from ..models import HealthResponse
from ..ollama_client import ollama_client

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health", response_model=HealthResponse)
@router.get("/ai/status", response_model=HealthResponse)
async def check_health() -> HealthResponse:
    """
    Check the health of the TrailMate backend and the local Ollama Gemma instance.
    Returns status, installed models, and instructions if Ollama or Gemma is missing.
    """
    is_online, installed, active_model = await ollama_client.get_status()

    if not is_online:
        return HealthResponse(
            status="degraded",
            ollama_online=False,
            ollama_base_url=settings.OLLAMA_BASE_URL,
            selected_model=settings.OLLAMA_MODEL,
            model_available=False,
            installed_models=[],
            message=(
                "Ollama daemon is not reachable at "
                f"{settings.OLLAMA_BASE_URL}. Run 'ollama serve' in your terminal."
            ),
        )

    has_model = bool(active_model)
    target_model = active_model or settings.OLLAMA_MODEL

    if not has_model:
        return HealthResponse(
            status="model_missing",
            ollama_online=True,
            ollama_base_url=settings.OLLAMA_BASE_URL,
            selected_model=settings.OLLAMA_MODEL,
            model_available=False,
            installed_models=installed,
            message=(
                f"Ollama is running, but open-weight model '{settings.OLLAMA_MODEL}' "
                f"is not installed. Run: 'ollama pull {settings.OLLAMA_MODEL}'."
            ),
        )

    return HealthResponse(
        status="healthy",
        ollama_online=True,
        ollama_base_url=settings.OLLAMA_BASE_URL,
        selected_model=target_model,
        model_available=True,
        installed_models=installed,
        message=f"Local AI ready. Connected to Ollama with model '{target_model}'.",
    )
