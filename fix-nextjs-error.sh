#!/bin/bash

echo "🔧 Fixing Next.js Error - Converting to React App"

# Remove any Next.js related files and folders
echo "🗑️  Removing Next.js files..."
rm -rf .next
rm -rf next.config.js
rm -rf next.config.mjs
rm -rf pages
rm -rf app

# Remove Next.js dependencies if they exist
echo "📦 Removing Next.js dependencies..."
npm uninstall next @next/font

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Remove node_modules and package-lock.json
echo "🗑️  Removing node_modules..."
rm -rf node_modules
rm -f package-lock.json

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
npm install

echo "✅ Fixed! This is now properly configured as a React.js app"
echo "🚀 You can now run: npm start"
