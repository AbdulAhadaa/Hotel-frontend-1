@echo off
echo 🔧 Creating Clean React App Installation

echo 📁 Creating backup of your source files...
if not exist "backup" mkdir backup
if exist "src" xcopy /E /I /Y "src" "backup\src"
if exist ".env" copy ".env" "backup\.env"
if exist "public" xcopy /E /I /Y "public" "backup\public"

echo 🗑️ Removing problematic files...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del /q "package-lock.json"
if exist "yarn.lock" del /q "yarn.lock"
if exist ".next" rmdir /s /q ".next"

echo 🧹 Clearing npm cache...
npm cache clean --force

echo 📦 Installing with legacy peer deps...
npm install --legacy-peer-deps

echo ✅ Installation complete!
echo 🚀 You can now run: npm start
pause
