"""Prompt templates and system instructions for Gemma open-weight models."""
from .models import MissionRequest


SYSTEM_PROMPT = """You are TrailMate AI, an expert outdoor guide and adventure designer.
Your mission is to inspire people to step away from screens, break digital dopamine loops, and reconnect with nature through physical presence and sensory awareness.

Safety & Practicality Rules:
- Recommend only safe, legal, and accessible activities in public or permitted outdoor spaces.
- Never encourage trespassing on private property or entering hazardous terrain (unmarked cliffs, deep rapid water, dangerous wildlife zones).
- Do not provide medical advice or recommend extreme physical exertion beyond the requested difficulty.
- Do not require specialized or unavailable gear unless standard for the activity.
- Strongly encourage pocketing phones and experiencing the world directly through the senses.

Every mission must feature:
1. Purely physical, screen-free engagement.
2. Distinct sensory elements (sound of wind/birds, tactile tree bark/leaves, sight of shifting light/canopy, scent of earth/rain).
3. Clear sequential milestones scaled to the requested time and difficulty.
4. A tangible 'Touch Grass Bonus Challenge' that physically grounds the user (bare hand on living earth/grass/tree for 30 seconds).

CRITICAL FORMATTING INSTRUCTION:
You MUST respond with valid, parseable JSON ONLY.
Do not include any greeting, preamble, markdown explanations, or comments outside the JSON object.
"""


def build_mission_prompt(request: MissionRequest) -> str:
    """Build the structured prompt for Gemma to generate an outdoor mission."""
    time_str = f"{request.time_minutes} minutes"
    env_str = request.environment if request.environment and request.environment != "any" else "local outdoor environment (park, neighborhood streets, or nature trail)"

    return f"""Generate an inspiring, offline outdoor mission based on these parameters:
- Time available: {time_str}
- Activity: {request.activity}
- Difficulty level: {request.difficulty}
- Companionship: {request.companion}
- Preferred Environment: {env_str}

Return a single JSON object matching EXACTLY this JSON structure:
{{
  "title": "Creative, catchy mission title (e.g. 'Canopy & Creek Recon', 'Urban Botanist Expedition')",
  "tagline": "A poetic one-sentence summary capturing the outdoor essence",
  "duration_minutes": {request.time_minutes},
  "activity": "{request.activity}",
  "difficulty": "{request.difficulty}",
  "companion": "{request.companion}",
  "environment": "{env_str}",
  "mindset_quote": "A short, grounded inspirational quote about nature, mindfulness, or stepping away from screens",
  "safety_tip": "A practical outdoor safety note (e.g. hydration, staying aware of surroundings, weather)",
  "tasks": [
    {{
      "id": 1,
      "title": "Short title for step 1",
      "description": "Specific offline action to perform outdoors",
      "sensory_focus": "One sensory trigger (e.g. 'Sound: Birdsong', 'Sight: Shadows & Light', 'Touch: Tree Bark', 'Smell: Fresh Earth')",
      "screen_free_tip": "Specific reminder to pocket phone or focus eyes forward",
      "touch_grass_points": 25
    }},
    {{
      "id": 2,
      "title": "Short title for step 2",
      "description": "Specific offline action to perform outdoors",
      "sensory_focus": "Sensory trigger",
      "screen_free_tip": "Reminder",
      "touch_grass_points": 25
    }},
    {{
      "id": 3,
      "title": "Short title for step 3",
      "description": "Specific offline action to perform outdoors",
      "sensory_focus": "Sensory trigger",
      "screen_free_tip": "Reminder",
      "touch_grass_points": 25
    }},
  ],
  "bonus_challenge": {{
    "title": "Touch Grass Ritual",
    "description": "A literal hands-on tactile grounding challenge (e.g. kneeling to touch natural moss/soil/grass with your bare palm for 30 uninterrupted seconds)",
    "points": 50
  }}
}}

Generate 3 to 4 sequential tasks appropriate for {time_str} duration. Keep each description concise and actionable (1 to 2 sentences).
Provide ONLY valid JSON.
"""
