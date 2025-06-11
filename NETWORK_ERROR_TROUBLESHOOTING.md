# Network Error Troubleshooting Guide

## 🚨 Quick Diagnosis

Visit this page to diagnose the issue:
**http://localhost:3000/network-diagnostics**

## 🔍 Common Network Error Causes

### 1. **Backend Server Not Running**
**Symptoms:** "ECONNREFUSED" or "Cannot connect to server"

**Solutions:**
\`\`\`bash
# Check if backend is running
curl http://localhost:3000

# Start backend server
cd your-backend-directory
npm run dev
\`\`\`

### 2. **Wrong API URL**
**Symptoms:** "404 Not Found" or "Cannot reach server"

**Check your .env file:**
\`\`\`env
REACT_APP_API_URL=http://localhost:3000
\`\`\`

**Verify backend port:**
\`\`\`bash
# Check what's running on port 3000
lsof -i :3000
netstat -an | grep 3000
\`\`\`

### 3. **CORS Issues**
**Symptoms:** "CORS policy" error in browser console

**Backend Fix (Express.js):**
\`\`\`javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
\`\`\`

### 4. **Firewall/Antivirus Blocking**
**Symptoms:** Intermittent connection issues

**Solutions:**
- Temporarily disable firewall/antivirus
- Add exception for Node.js
- Check Windows Defender settings

### 5. **Port Already in Use**
**Symptoms:** Backend fails to start

**Solutions:**
\`\`\`bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
\`\`\`

## 🛠️ Step-by-Step Debugging

### Step 1: Check Backend Status
\`\`\`bash
# Test if backend is reachable
curl -v http://localhost:3000

# Expected response: HTML page or JSON
# If connection refused: Backend not running
\`\`\`

### Step 2: Check Specific Endpoint
\`\`\`bash
# Test registration endpoint
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","role":"guest"}'

# Expected: 400/422 (validation error) or 201 (success)
# If 404: Endpoint doesn't exist
\`\`\`

### Step 3: Check Browser Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Try registration
4. Look for:
   - Red requests (failed)
   - Status codes
   - Error messages

### Step 4: Check Console Logs
1. Open browser console
2. Look for:
   - CORS errors
   - Network errors
   - API request logs (if debug enabled)

## 🔧 Quick Fixes

### Fix 1: Restart Everything
\`\`\`bash
# Stop all processes
pkill -f node

# Start backend
cd backend && npm run dev

# Start frontend (new terminal)
cd frontend && npm start
\`\`\`

### Fix 2: Clear Cache
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Clear browser cache
# Ctrl+Shift+R (hard refresh)
\`\`\`

### Fix 3: Check Environment
\`\`\`bash
# Verify environment variables
echo $REACT_APP_API_URL

# Or in browser console
console.log(process.env.REACT_APP_API_URL)
\`\`\`

### Fix 4: Test with Different Tool
\`\`\`bash
# Use Postman or curl to test backend directly
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"guest"}'
\`\`\`

## 📊 Backend Requirements Checklist

Your backend must have:
- [ ] Server running on port 3000
- [ ] CORS middleware configured
- [ ] `/auth/register` endpoint implemented
- [ ] Proper error handling
- [ ] JSON body parser middleware

## 🚀 Testing Your Fix

After making changes:
1. Visit: http://localhost:3000/network-diagnostics
2. Click "Run Network Diagnostics"
3. All tests should pass ✅
4. Try registration again

## 📞 Still Having Issues?

If none of the above works:
1. Share the exact error message
2. Check backend logs for errors
3. Verify backend API documentation
4. Test backend endpoints with Postman
5. Check if MongoDB is running (if using database)
\`\`\`
