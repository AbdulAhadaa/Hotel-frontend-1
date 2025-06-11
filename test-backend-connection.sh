#!/bin/bash

echo "🔍 Testing Backend Connection..."

# Get API URL from environment or use default
API_URL=${REACT_APP_API_URL:-"http://localhost:3000"}

echo "📡 Testing connection to: $API_URL"

# Test 1: Basic connectivity
echo "1️⃣ Testing basic connectivity..."
if curl -s --connect-timeout 5 "$API_URL" > /dev/null; then
    echo "✅ Backend is reachable"
else
    echo "❌ Backend is not reachable"
    echo "💡 Make sure your backend server is running on $API_URL"
    exit 1
fi

# Test 2: Health endpoint
echo "2️⃣ Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s -w "%{http_code}" "$API_URL/health" -o /dev/null)
if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo "✅ Health endpoint working"
else
    echo "⚠️  Health endpoint returned: $HEALTH_RESPONSE"
fi

# Test 3: Auth endpoints
echo "3️⃣ Testing auth endpoints..."

# Test register endpoint
REGISTER_RESPONSE=$(curl -s -w "%{http_code}" -X POST "$API_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d '{}' -o /dev/null)

if [ "$REGISTER_RESPONSE" = "400" ] || [ "$REGISTER_RESPONSE" = "422" ]; then
    echo "✅ Register endpoint available (validation working)"
elif [ "$REGISTER_RESPONSE" = "404" ]; then
    echo "❌ Register endpoint not found"
else
    echo "⚠️  Register endpoint returned: $REGISTER_RESPONSE"
fi

# Test login endpoint
LOGIN_RESPONSE=$(curl -s -w "%{http_code}" -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{}' -o /dev/null)

if [ "$LOGIN_RESPONSE" = "400" ] || [ "$LOGIN_RESPONSE" = "422" ]; then
    echo "✅ Login endpoint available (validation working)"
elif [ "$LOGIN_RESPONSE" = "404" ]; then
    echo "❌ Login endpoint not found"
else
    echo "⚠️  Login endpoint returned: $LOGIN_RESPONSE"
fi

echo ""
echo "🎯 Integration Test Summary:"
echo "- Backend URL: $API_URL"
echo "- Basic connectivity: ✅"
echo "- Health endpoint: $([ "$HEALTH_RESPONSE" = "200" ] && echo "✅" || echo "⚠️")"
echo "- Auth endpoints: $([ "$REGISTER_RESPONSE" != "404" ] && [ "$LOGIN_RESPONSE" != "404" ] && echo "✅" || echo "❌")"
echo ""
echo "🚀 Next steps:"
echo "1. Start your React app: npm start"
echo "2. Visit: http://localhost:3000/test-integration"
echo "3. Run the integration tests from the UI"
