#!/bin/bash

echo "🔍 Verifying React App Configuration..."

# Check if this is a React app
if [ -f "package.json" ]; then
    echo "✅ package.json found"
    
    # Check for react-scripts
    if grep -q "react-scripts" package.json; then
        echo "✅ react-scripts found in package.json"
    else
        echo "❌ react-scripts NOT found in package.json"
        echo "💡 This might be the issue!"
    fi
    
    # Check start script
    if grep -q '"start": "react-scripts start"' package.json; then
        echo "✅ Correct start script found"
    else
        echo "❌ Incorrect start script"
        echo "💡 Should be: \"start\": \"react-scripts start\""
    fi
else
    echo "❌ package.json not found"
fi

# Check for Next.js files (should not exist)
if [ -d ".next" ]; then
    echo "❌ .next directory found (Next.js artifact)"
    echo "💡 Remove with: rm -rf .next"
fi

if [ -f "next.config.js" ] || [ -f "next.config.mjs" ]; then
    echo "❌ Next.js config file found"
    echo "💡 Remove with: rm -f next.config.js next.config.mjs"
fi

# Check for React app structure
if [ -d "src" ] && [ -f "src/index.js" ]; then
    echo "✅ React app structure found (src/index.js)"
else
    echo "❌ React app structure missing"
fi

if [ -d "public" ] && [ -f "public/index.html" ]; then
    echo "✅ Public folder with index.html found"
else
    echo "❌ Public folder structure missing"
fi

echo ""
echo "🎯 Summary:"
echo "This should be a React.js app using Create React App"
echo "If you see any ❌ above, run the fix script: ./fix-nextjs-error.sh"
