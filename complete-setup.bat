@echo off
echo 🚀 Complete React App Setup

echo 📁 Creating directory structure...
if not exist "public" mkdir public
if not exist "src" mkdir src
if not exist "src\components" mkdir src\components
if not exist "src\components\common" mkdir src\components\common
if not exist "src\components\layouts" mkdir src\components\layouts
if not exist "src\pages" mkdir src\pages
if not exist "src\pages\auth" mkdir src\pages\auth
if not exist "src\store" mkdir src\store
if not exist "src\store\slices" mkdir src\store\slices
if not exist "src\services" mkdir src\services
if not exist "src\styles" mkdir src\styles

echo 📄 Creating essential files...
call create-missing-files.bat

echo 🧹 Cleaning npm...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del /q "package-lock.json"
npm cache clean --force

echo 📦 Installing dependencies...
npm install --legacy-peer-deps

echo ✅ Setup complete!
echo 🚀 Starting the app...
npm start
