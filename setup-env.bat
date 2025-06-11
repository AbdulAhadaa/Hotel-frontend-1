@echo off
echo 🔧 Setting up Environment Variables for Roomoree Frontend

REM Check if .env already exists
if exist ".env" (
    echo ⚠️  .env file already exists. Creating backup...
    copy ".env" ".env.backup.%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
)

REM Copy from example
if exist ".env.example" (
    echo 📋 Copying from .env.example...
    copy ".env.example" ".env"
) else (
    echo 📝 Creating new .env file...
    (
        echo # API Configuration
        echo REACT_APP_API_URL=http://localhost:3000
        echo REACT_APP_API_TIMEOUT=10000
        echo.
        echo # Authentication
        echo REACT_APP_AUTH_TOKEN_NAME=access_token
        echo.
        echo # Application Settings
        echo REACT_APP_APP_NAME=Roomoree
        echo REACT_APP_ENVIRONMENT=development
        echo REACT_APP_DEBUG=true
        echo.
        echo # Feature Flags
        echo REACT_APP_ENABLE_SOCIAL_LOGIN=false
        echo REACT_APP_ENABLE_NOTIFICATIONS=true
    ) > .env
)

echo ✅ Environment file created successfully!
echo 📝 Please review and update .env with your specific configuration
echo 🚀 You can now run: npm start
pause
