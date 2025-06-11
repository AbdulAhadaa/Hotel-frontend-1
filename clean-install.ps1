# PowerShell script for clean installation

Write-Host "🔧 Creating Clean React App Installation" -ForegroundColor Green

# Create backup
Write-Host "📁 Creating backup of your source files..." -ForegroundColor Yellow
if (-not (Test-Path "backup")) { New-Item -ItemType Directory -Name "backup" }
if (Test-Path "src") { Copy-Item -Recurse -Force "src" "backup\src" }
if (Test-Path ".env") { Copy-Item -Force ".env" "backup\.env" }
if (Test-Path "public") { Copy-Item -Recurse -Force "public" "backup\public" }

# Remove problematic files
Write-Host "🗑️ Removing problematic files..." -ForegroundColor Yellow
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
if (Test-Path "yarn.lock") { Remove-Item -Force "yarn.lock" }
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }

# Clear cache
Write-Host "🧹 Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force

# Install with legacy peer deps
Write-Host "📦 Installing with legacy peer deps..." -ForegroundColor Yellow
npm install --legacy-peer-deps

Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host "🚀 You can now run: npm start" -ForegroundColor Cyan
