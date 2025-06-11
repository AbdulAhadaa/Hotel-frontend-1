# Windows Setup Instructions

## 🚨 Quick Fix for Windows

### **Method 1: PowerShell Commands**
Open PowerShell in your project directory and run:

\`\`\`powershell
# Remove Next.js artifacts
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "next.config.js") { Remove-Item -Force "next.config.js" }
if (Test-Path "next.config.mjs") { Remove-Item -Force "next.config.mjs" }

# Clean and reinstall
if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
if (Test-Path "package-lock.json") { Remove-Item -Force "package-lock.json" }
npm cache clean --force
npm install

# Start the app
npm start
\`\`\`

### **Method 2: Command Prompt (CMD)**
Open Command Prompt in your project directory and run:

\`\`\`cmd
REM Remove Next.js artifacts
if exist ".next" rmdir /s /q ".next"
if exist "next.config.js" del /q "next.config.js"
if exist "next.config.mjs" del /q "next.config.mjs"

REM Clean and reinstall
if exist "node_modules" rmdir /s /q "node_modules"
if exist "package-lock.json" del /q "package-lock.json"
npm cache clean --force
npm install

REM Start the app
npm start
\`\`\`

### **Method 3: Use the Scripts**
Run one of the provided scripts:

**For PowerShell:**
\`\`\`powershell
.\fix-nextjs-error.ps1
\`\`\`

**For Command Prompt:**
\`\`\`cmd
fix-nextjs-error.bat
\`\`\`

## 🔍 **Step-by-Step Manual Fix**

### **Step 1: Check what files exist**
\`\`\`powershell
Get-ChildItem -Name
\`\`\`

### **Step 2: Remove problematic files**
\`\`\`powershell
# Only run these if the files/folders exist
Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
Remove-Item -Force "next.config.js" -ErrorAction SilentlyContinue
Remove-Item -Force "next.config.mjs" -ErrorAction SilentlyContinue
\`\`\`

### **Step 3: Clean npm**
\`\`\`powershell
Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
npm cache clean --force
\`\`\`

### **Step 4: Reinstall**
\`\`\`powershell
npm install
\`\`\`

### **Step 5: Start the app**
\`\`\`powershell
npm start
\`\`\`

## ✅ **Success Indicators**

After running the fix, you should see:
\`\`\`
> roomoree-frontend@0.1.0 start
> react-scripts start

Starting the development server...
Compiled successfully!

You can now view roomoree-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
\`\`\`

## 🚨 **If You Still Get Errors**

### **Check your package.json:**
\`\`\`powershell
Get-Content package.json | Select-String "scripts" -A 10
\`\`\`

Should show:
\`\`\`json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
\`\`\`

### **Check for remaining Next.js files:**
\`\`\`powershell
Get-ChildItem -Name | Select-String "next"
\`\`\`

Should return nothing.

## 💡 **Windows-Specific Tips**

1. **Use PowerShell as Administrator** if you get permission errors
2. **Close VS Code** before running the cleanup commands
3. **Disable antivirus temporarily** if file deletion is slow
4. **Use Git Bash** if you prefer Unix-like commands on Windows

## 🔄 **Alternative: Fresh Install**

If nothing works, create a fresh React app:

\`\`\`powershell
# Navigate to parent directory
cd ..

# Create new React app
npx create-react-app roomoree-frontend-new
cd roomoree-frontend-new

# Copy your files (adjust paths as needed)
Copy-Item -Recurse "..\roomoree-frontend\src\*" ".\src\"
Copy-Item "..\roomoree-frontend\.env" ".\"

# Install additional dependencies
npm install @reduxjs/toolkit react-redux react-router-dom axios react-hook-form react-hot-toast lucide-react

# Start the app
npm start
\`\`\`
\`\`\`
