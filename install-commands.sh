#!/bin/bash

echo "🚀 Installing Roomoree Frontend Dependencies..."

# Remove existing node_modules and package-lock.json
echo "🧹 Cleaning existing installations..."
rm -rf node_modules
rm -f package-lock.json

# Install all dependencies
echo "📦 Installing React and core dependencies..."
npm install react@^18.2.0 react-dom@^18.2.0 react-scripts@5.0.1

echo "📦 Installing Redux for state management..."
npm install @reduxjs/toolkit@^2.0.1 react-redux@^9.0.4

echo "📦 Installing routing..."
npm install react-router-dom@^6.20.1

echo "📦 Installing HTTP client..."
npm install axios@^1.6.2

echo "📦 Installing form handling..."
npm install react-hook-form@^7.48.2

echo "📦 Installing notifications..."
npm install react-hot-toast@^2.4.1

echo "📦 Installing icons..."
npm install lucide-react@^0.294.0

echo "📦 Installing testing utilities..."
npm install @testing-library/jest-dom@^5.16.4 @testing-library/react@^13.3.0 @testing-library/user-event@^13.5.0

echo "📦 Installing web vitals..."
npm install web-vitals@^2.1.4

echo "✅ All dependencies installed successfully!"
echo "🎯 Run 'npm start' to start the development server"
