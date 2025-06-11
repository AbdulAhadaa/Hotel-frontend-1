@echo off
echo 🔧 Creating Missing React App Files

echo 📁 Creating public directory if it doesn't exist...
if not exist "public" mkdir public

echo 📄 Creating index.html...
echo ^<!DOCTYPE html^> > public\index.html
echo ^<html lang="en"^> >> public\index.html
echo   ^<head^> >> public\index.html
echo     ^<meta charset="utf-8" /^> >> public\index.html
echo     ^<link rel="icon" href="%%PUBLIC_URL%%/favicon.ico" /^> >> public\index.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1" /^> >> public\index.html
echo     ^<meta name="theme-color" content="#000000" /^> >> public\index.html
echo     ^<meta name="description" content="Roomoree - Find your perfect stay" /^> >> public\index.html
echo     ^<title^>Roomoree^</title^> >> public\index.html
echo   ^</head^> >> public\index.html
echo   ^<body^> >> public\index.html
echo     ^<noscript^>You need to enable JavaScript to run this app.^</noscript^> >> public\index.html
echo     ^<div id="root"^>^</div^> >> public\index.html
echo   ^</body^> >> public\index.html
echo ^</html^> >> public\index.html

echo 📄 Creating manifest.json...
echo { > public\manifest.json
echo   "short_name": "Roomoree", >> public\manifest.json
echo   "name": "Roomoree - Property Rental Platform", >> public\manifest.json
echo   "start_url": ".", >> public\manifest.json
echo   "display": "standalone", >> public\manifest.json
echo   "theme_color": "#000000", >> public\manifest.json
echo   "background_color": "#ffffff" >> public\manifest.json
echo } >> public\manifest.json

echo 📄 Creating robots.txt...
echo User-agent: * > public\robots.txt
echo Disallow: >> public\robots.txt

echo ✅ All missing files created!
echo 🚀 You can now run: npm start
pause
