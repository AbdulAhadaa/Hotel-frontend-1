@echo off
echo 🚀 Quick Fix for Dependency Conflict

echo 🧹 Clearing npm cache...
npm cache clean --force

echo 📦 Installing with legacy peer deps...
npm install --legacy-peer-deps

echo ✅ Done! Starting the app...
npm start
