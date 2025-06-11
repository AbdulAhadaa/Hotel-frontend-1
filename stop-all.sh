#!/bin/bash

echo "🛑 Stopping Roomoree Application Stack"

# Stop Backend
if [ -f .backend.pid ]; then
    BACKEND_PID=$(cat .backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo "🔧 Stopping Backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID
        rm .backend.pid
    fi
fi

# Stop Frontend
if [ -f .frontend.pid ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "🎨 Stopping Frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        rm .frontend.pid
    fi
fi

# Kill any remaining Node processes on port 3000
echo "🧹 Cleaning up any remaining processes..."
pkill -f "node.*3000" 2>/dev/null || true

echo "✅ All services stopped"
