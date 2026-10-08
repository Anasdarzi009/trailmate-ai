"""FastAPI application entrypoint for TrailMate AI."""
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import health, missions

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("trailmate")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    logger.info("🌿 Starting TrailMate AI Backend...")
    logger.info(f"🌿 Ollama target URL: {settings.OLLAMA_BASE_URL}")
    logger.info(f"🌿 Preferred Model: {settings.OLLAMA_MODEL}")
    yield
    logger.info("🌿 Shutting down TrailMate AI Backend.")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "TrailMate AI — An outdoor mission generator designed to get people off their "
        "screens and outside. Powered locally by Google Gemma open-weight models via Ollama."
    ),
    lifespan=lifespan,
)

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(health.router)
app.include_router(missions.router)


@app.get("/")
def root():
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "theme": "Touch Grass — Hacktoberfest 2026",
        "model": settings.OLLAMA_MODEL,
        "endpoints": {
            "health": "/api/health",
            "ai_status": "/api/ai/status",
            "generate_mission": "/api/missions/generate (POST)",
            "docs": "/docs",
        },
    }
