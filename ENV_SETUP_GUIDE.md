# Environment Variables Setup Guide

## 📋 Quick Setup

1. **Copy the environment file:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. **Update the API URL** in `.env` to match your backend:
   \`\`\`env
   REACT_APP_API_URL=http://localhost:3000
   \`\`\`

3. **Start your application:**
   \`\`\`bash
   npm start
   \`\`\`

## 🔧 Environment Files Explained

### `.env` - Development Environment
- Used during local development
- Points to your local backend server
- Debug mode enabled
- Safe to commit basic structure (without secrets)

### `.env.example` - Template File
- Template showing all available variables
- Safe to commit to version control
- Copy this to create your `.env` file

### `.env.production` - Production Environment
- Used when building for production
- Points to production backend server
- Debug mode disabled
- Should contain production API keys

## 🔑 Key Variables Explained

### **API Configuration**
\`\`\`env
REACT_APP_API_URL=http://localhost:3000
\`\`\`
- **Purpose**: Your backend server URL
- **Development**: `http://localhost:3000`
- **Production**: `https://api.yourdomain.com`

### **Authentication**
\`\`\`env
REACT_APP_AUTH_TOKEN_NAME=access_token
\`\`\`
- **Purpose**: Name of the token stored in localStorage
- **Must match**: Your backend's token field name

### **Debug Settings**
\`\`\`env
REACT_APP_DEBUG=true
\`\`\`
- **Development**: `true` (shows connection status, logs API calls)
- **Production**: `false` (hides debug information)

### **Feature Flags**
\`\`\`env
REACT_APP_ENABLE_SOCIAL_LOGIN=false
\`\`\`
- **Purpose**: Enable/disable features
- **Development**: `false` (until you set up OAuth)
- **Production**: `true` (when ready)

## 🚀 Integration Steps

### Step 1: Backend Integration
1. Make sure your backend is running on `http://localhost:3000`
2. Verify these endpoints exist:
   - `POST /auth/register`
   - `POST /auth/login`
   - `GET /auth/verify-email`
   - `GET /users/me`

### Step 2: Frontend Setup
1. Create your `.env` file from the template
2. Update `REACT_APP_API_URL` to match your backend
3. Start the frontend: `npm start`

### Step 3: Test Integration
1. Visit: `http://localhost:3000/test-integration`
2. Run all tests to verify connection
3. Test registration and login flows

## 🔍 Troubleshooting

### Backend Not Connecting?
\`\`\`env
# Check your API URL
REACT_APP_API_URL=http://localhost:3000

# Enable debug mode
REACT_APP_DEBUG=true
\`\`\`

### CORS Issues?
Make sure your backend allows requests from your frontend URL:
\`\`\`javascript
// In your backend
app.use(cors({
  origin: 'http://localhost:3000'
}));
\`\`\`

### Environment Variables Not Loading?
1. **Restart the development server** after changing `.env`
2. **Check variable names** start with `REACT_APP_`
3. **Verify file location** (`.env` should be in project root)

## 📊 Testing Your Setup

### Check Variables Are Loaded
\`\`\`javascript
// In browser console
console.log('API URL:', process.env.REACT_APP_API_URL);
console.log('Debug Mode:', process.env.REACT_APP_DEBUG);
\`\`\`

### Test API Connection
1. Open browser DevTools
2. Go to Network tab
3. Try registering a user
4. Check if API calls are being made to correct URL

## 🌍 Different Environments

### Development
\`\`\`env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_DEBUG=true
REACT_APP_ENVIRONMENT=development
\`\`\`

### Staging
\`\`\`env
REACT_APP_API_URL=https://staging-api.roomoree.com
REACT_APP_DEBUG=false
REACT_APP_ENVIRONMENT=staging
\`\`\`

### Production
\`\`\`env
REACT_APP_API_URL=https://api.roomoree.com
REACT_APP_DEBUG=false
REACT_APP_ENVIRONMENT=production
\`\`\`

## 🔐 Security Notes

1. **Never commit sensitive data** to version control
2. **Use different keys** for development and production
3. **Rotate keys regularly** in production
4. **Only expose necessary variables** to the frontend

## 📞 Need Help?

If you're still having issues:
1. Check the integration test page: `/test-integration`
2. Look at browser console for errors
3. Verify backend is running and accessible
4. Check that all required endpoints are implemented
