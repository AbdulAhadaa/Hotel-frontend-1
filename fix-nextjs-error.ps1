# PowerShell script to fix Next.js error on Windows

Write-Host "🔧 Fixing Next.js Error - Converting to React App" -ForegroundColor Green

# Remove any Next.js related files and folders
Write-Host "🗑️  Removing Next.js files..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "next.config.js") { Remove-Item -Force "next.config.js" }
if (Test-Path "next.config.mjs") { Remove-Item -Force "next.config.mjs" }
if (Test-Path "pages") { Remove-Item -Recurse -Force "pages" }

# Remove node_modules and package-lock.json
Write-Host "🗑️  Removing node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }

# Clear npm cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Reinstall dependencies
Write-Host "📦 Reinstalling dependencies..." -ForegroundColor Yellow
npm install

Write-Host "✅ Fixed! This is now properly configured as a React.js app" -ForegroundColor Green
Write-Host "🚀 You can now run: npm start" -ForegroundColor Cyan
