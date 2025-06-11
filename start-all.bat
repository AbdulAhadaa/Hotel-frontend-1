@echo off
echo 🚀 Starting Roomoree Application Stack

echo 🗄️ Checking MongoDB...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo ❌ MongoDB is not running. Please start MongoDB first.
    echo 💡 Run: net start MongoDB
    pause
    exit /b 1
) else (
    echo ✅ MongoDB is running
)

echo 🔧 Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"

echo ⏳ Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo 🎨 Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm start"

echo.
echo 🎉 Roomoree Application Started Successfully!
echo 📊 Backend API: http://localhost:3000/api
echo 🎨 Frontend App: http://localhost:3000
echo 🧪 Integration Test: http://localhost:3000/test-integration
echo.
echo Press any key to continue...
pause >nul
