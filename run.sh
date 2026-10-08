#!/usr/bin/env bash
# ==============================================================================
# TrailMate AI — Unified Startup Script
# Hacktoberfest 2026 DEV Challenge Week 1: "Touch Grass"
# ==============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "🌿 =================================================="
echo "🌲 TrailMate AI — Touch Grass Mission Generator"
echo "🌿 Powered by Google Gemma 3 4B via Ollama"
echo "🌲 =================================================="

# 1. Check Ollama
if ! command -v ollama &> /dev/null; then
    echo "⚠️  Ollama CLI is not found in PATH."
    echo "    Please install Ollama from https://ollama.com or brew install ollama"
    echo "    Backend will start, but missions will require Ollama."
else
    echo "✅ Ollama detected."
    # Check if ollama is running
    if ! curl -s http://127.0.0.1:11434/api/tags > /dev/null 2>&1; then
        echo "🚀 Starting Ollama daemon in background..."
        ollama serve > /dev/null 2>&1 &
        sleep 2
    else
        echo "✅ Ollama server is already running."
    fi
fi

# 2. Check Python Virtualenv
if [ ! -d "backend/.venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv backend/.venv
    backend/.venv/bin/pip install --upgrade pip
    backend/.venv/bin/pip install -r backend/requirements.txt
fi

# 3. Check Frontend node_modules
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

echo ""
echo "🚀 Starting TrailMate Backend on http://127.0.0.1:8000 ..."
PYTHONPATH=. backend/.venv/bin/uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

echo "🚀 Starting TrailMate Frontend on http://localhost:5173 ..."
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

cleanup() {
    echo ""
    echo "🛑 Shutting down TrailMate AI servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

echo ""
echo "✨ TrailMate AI is running!"
echo "   - Web App:  http://localhost:5173"
echo "   - API Docs: http://127.0.0.1:8000/docs"
echo "   - Health:   http://127.0.0.1:8000/api/health"
echo ""
echo "Press Ctrl+C to stop all servers."
wait
