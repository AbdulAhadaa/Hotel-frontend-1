@echo off
echo 🛑 Stopping Roomoree Application Stack

echo 🔧 Stopping Backend processes...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq Backend Server*" 2>nul

echo 🎨 Stopping Frontend processes...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq Frontend Server*" 2>nul

echo 🧹 Cleaning up any remaining Node processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /F /PID %%a 2>nul

echo ✅ All services stopped
pause
