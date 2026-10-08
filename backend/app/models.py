"""Pydantic schemas for TrailMate AI missions and health checks."""
from typing import List, Optional
from pydantic import BaseModel, Field


class MissionRequest(BaseModel):
    time_minutes: int = Field(
        ...,
        ge=5,
        le=360,
        description="Available outdoor time in minutes (e.g. 15, 30, 45, 60, 90, 120)"
    )
    activity: str = Field(
        ...,
        min_length=2,
        max_length=60,
        description="Outdoor activity type (walking, hiking, exploring, relaxing, photography, cycling, mindfulness)"
    )
    difficulty: str = Field(
        ...,
        description="Difficulty level: easy, moderate, adventurous"
    )
    companion: str = Field(
        ...,
        description="Group mode: solo, friends, family, dog"
    )
    environment: Optional[str] = Field(
        default="any",
        description="Preferred outdoor environment (park, urban, woods, waterfront, neighborhood, any)"
    )


class MissionTask(BaseModel):
    id: int
    title: str = Field(..., description="Short actionable step title")
    description: str = Field(..., description="Detailed real-world instruction to execute outdoors")
    sensory_focus: Optional[str] = Field(None, description="Sensory trigger: Sound, Sight, Touch, Smell, or Mindful Breath")
    screen_free_tip: Optional[str] = Field(None, description="Gentle nudge to pocket the phone or be present")
    touch_grass_points: int = Field(default=25, description="Grass points awarded on completion")


class BonusGrassChallenge(BaseModel):
    title: str = Field(..., description="Title of the tangible grass-touching challenge")
    description: str = Field(..., description="Physical touch or ground connection prompt")
    points: int = Field(default=50, description="Bonus points for completing")


class MissionResponse(BaseModel):
    id: str
    title: str
    tagline: str
    duration_minutes: int
    activity: str
    difficulty: str
    companion: str
    environment: str
    mindset_quote: str
    safety_tip: str
    tasks: List[MissionTask]
    bonus_challenge: BonusGrassChallenge
    total_potential_points: int
    model_used: str
    generated_at: str


class HealthResponse(BaseModel):
    status: str
    ollama_online: bool
    ollama_base_url: str
    selected_model: str
    model_available: bool
    installed_models: List[str]
    message: str


class ErrorResponse(BaseModel):
    error: str
    detail: str
    remedy: Optional[str] = None
    code: str
