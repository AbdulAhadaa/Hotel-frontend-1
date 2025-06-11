#!/bin/bash

echo "🚀 Starting Roomoree Application Stack"

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check MongoDB
echo "🗄️ Checking MongoDB..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running. Please start MongoDB first."
    echo "💡 Run: brew services start mongodb/brew/mongodb-community"
    echo "💡 Or: sudo systemctl start mongod"
    exit 1
else
    echo "✅ MongoDB is running"
fi

# Check ports
check_port 3000 || exit 1

# Start Backend
echo "🔧 Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Check if backend is responding
if curl -s http://localhost:3000/api > /dev/null; then
    echo "✅ Backend is running on http://localhost:3000"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID
    exit 1
fi

# Start Frontend
echo "🎨 Starting Frontend Server..."
cd ../frontend
npm start &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "🎉 Roomoree Application Started Successfully!"
echo "📊 Backend API: http://localhost:3000/api"
echo "🎨 Frontend App: http://localhost:3000"
echo "🧪 Integration Test: http://localhost:3000/test-integration"
echo ""
echo "To stop all services, run: ./stop-all.sh"

# Save PIDs for stopping later
echo $BACKEND_PID > .backend.pid
echo $FRONTEND_PID > .frontend.pid
