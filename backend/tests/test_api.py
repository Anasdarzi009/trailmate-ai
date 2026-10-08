import sys
from pathlib import Path
from fastapi.testclient import TestClient

backend_dir = Path(__file__).resolve().parent.parent
root_dir = backend_dir.parent
for p in [str(backend_dir), str(root_dir)]:
    if p not in sys.path:
        sys.path.insert(0, p)

try:
    from backend.app.main import app
except ModuleNotFoundError:
    from app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "TrailMate AI" in data["app"]
    assert data["theme"] == "Touch Grass — Hacktoberfest 2026"


def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert "ollama_online" in data
    assert "selected_model" in data
    assert data["ollama_online"] is True
    assert "gemma3:4b" in data["selected_model"] or "gemma" in data["selected_model"]


def test_validation_rejects_empty_mission_request():
    response = client.post("/api/missions/generate", json={})
    assert response.status_code == 422  # Validation error
