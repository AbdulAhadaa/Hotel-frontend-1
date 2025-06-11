@echo off
echo 🔧 Fixing Next.js Error - Converting to React App

echo 🗑️  Removing Next.js files...
if exist ".next" rmdir /s /q ".next"
if exist "next.config.js" del /q "next.config.js"
if exist "next.config.mjs" del /q "next.config.mjs"
if exist "pages" rmdir /s /q "pages"

echo 🗑️  Removing node_modules...
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del /q "package-lock.json"

echo 🧹 Clearing npm cache...
npm cache clean --force

echo 📦 Reinstalling dependencies...
npm install

echo ✅ Fixed! This is now properly configured as a React.js app
echo 🚀 You can now run: npm start
pause
