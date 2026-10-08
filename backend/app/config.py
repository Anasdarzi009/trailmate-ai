"""Configuration settings for TrailMate AI backend."""
import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_NAME: str = "TrailMate AI Backend"
    APP_VERSION: str = "1.0.0"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # Ollama Local AI Configuration
    # Uses local Ollama instance running Gemma open-weight model
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "gemma3:4b")
    FALLBACK_MODELS: list[str] = [
        "gemma3:4b",
        "gemma3:1b",
        "gemma2:2b",
        "gemma2:9b",
        "gemma:2b",
        "gemma:7b",
        "gemma",
    ]
    GENERATION_TIMEOUT: float = float(os.getenv("GENERATION_TIMEOUT", "300.0"))

    # CORS Configuration
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*",
    ]


settings = Settings()
