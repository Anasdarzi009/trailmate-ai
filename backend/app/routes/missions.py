"""Mission generation route powered by local Gemma inference."""
from fastapi import APIRouter, HTTPException, status
from ..models import MissionRequest, MissionResponse
from ..ollama_client import (
    OllamaClientError,
    OllamaConnectionError,
    OllamaModelNotFoundError,
    ollama_client,
)

router = APIRouter(prefix="/api/missions", tags=["missions"])


@router.post(
    "/generate",
    response_model=MissionResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate outdoor mission using local Gemma model",
)
async def generate_mission(request: MissionRequest) -> MissionResponse:
    """
    Generate an offline, nature-focused outdoor mission.
    This sends the structured prompt to the locally running Gemma model
    via Ollama. No third-party or cloud AI APIs are used.
    """
    try:
        mission = await ollama_client.generate_mission(request)
        return mission

    except OllamaConnectionError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "error": "OLLAMA_UNREACHABLE",
                "message": e.message,
                "remedy": e.remedy,
                "guide": "Ensure Ollama is running locally. Start it with `ollama serve` in your terminal.",
            },
        )

    except OllamaModelNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "error": "MODEL_NOT_FOUND",
                "message": e.message,
                "remedy": e.remedy,
                "guide": f"Install the open-weight model by running: ollama pull {e.model_name}",
                "available_models": e.available_models,
            },
        )

    except OllamaClientError as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail={
                "error": e.code,
                "message": e.message,
                "remedy": e.remedy or "Check local Ollama server status or try again with different inputs.",
            },
        )

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "error": "INTERNAL_GENERATION_ERROR",
                "message": f"Unexpected error during mission generation: {str(exc)}",
            },
        )
