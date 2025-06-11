#!/bin/bash

echo "🔧 Setting up Environment Variables for Roomoree Frontend"

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists. Creating backup..."
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
fi

# Copy from example
if [ -f ".env.example" ]; then
    echo "📋 Copying from .env.example..."
    cp .env.example .env
else
    echo "📝 Creating new .env file..."
    cat > .env << 'EOF'
# API Configuration
REACT_APP_API_URL=http://localhost:3000
REACT_APP_API_TIMEOUT=10000

# Authentication
REACT_APP_AUTH_TOKEN_NAME=access_token

# Application Settings
REACT_APP_APP_NAME=Roomoree
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true

# Feature Flags
REACT_APP_ENABLE_SOCIAL_LOGIN=false
REACT_APP_ENABLE_NOTIFICATIONS=true
EOF
fi

echo "✅ Environment file created successfully!"
echo "📝 Please review and update .env with your specific configuration"
echo "🚀 You can now run: npm start"
