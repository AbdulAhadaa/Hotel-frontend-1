# Backend-Frontend Integration Testing

## 🎯 Overview

This guide helps you verify that your Roomoree frontend and backend are properly integrated and communicating.

## 🧪 Testing Methods

### 1. **Visual Integration Test Page**
Visit: `http://localhost:3000/test-integration`

This page provides:
- ✅ Backend health check
- ✅ API connectivity test
- ✅ Authentication endpoints verification
- ✅ Registration flow test
- ✅ Login flow test
- ✅ Real-time connection status

### 2. **Connection Status Indicator**
When `REACT_APP_DEBUG=true`, you'll see a connection status indicator in the bottom-right corner showing:
- 🟢 Connected (with response time)
- 🔴 Disconnected
- 🟡 Checking...

### 3. **Command Line Test**
Run the bash script to test from terminal:
\`\`\`bash
chmod +x test-backend-connection.sh
./test-backend-connection.sh
\`\`\`

## 🔧 Setup Instructions

### 1. **Add Test Route**
The test page is automatically added to your routes at `/test-integration`

### 2. **Enable Debug Mode**
Add to your `.env` file:
\`\`\`env
REACT_APP_DEBUG=true
\`\`\`

### 3. **Backend Requirements**
Your backend should have these endpoints:
- `GET /health` - Health check endpoint
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

## 🧪 Running Tests

### **Method 1: Web Interface**
1. Start your backend server
2. Start your React app: `npm start`
3. Navigate to: `http://localhost:3000/test-integration`
4. Click "Run All Tests"

### **Method 2: Command Line**
\`\`\`bash
# Make script executable
chmod +x test-backend-connection.sh

# Run tests
./test-backend-connection.sh
\`\`\`

## ✅ Expected Results

### **Successful Integration:**
- ✅ Backend Health: Connected (< 100ms)
- ✅ API Connection: Connected successfully
- ✅ Auth Endpoints: All endpoints available
- ✅ Registration Test: Working correctly
- ✅ Login Test: Working correctly

### **Common Issues:**

#### **Backend Not Running**
\`\`\`
❌ Backend Health: Backend server is not running
\`\`\`
**Solution:** Start your backend server

#### **Wrong API URL**
\`\`\`
❌ API Connection: Cannot connect to API server
\`\`\`
**Solution:** Check `REACT_APP_API_URL` in `.env`

#### **Missing Endpoints**
\`\`\`
❌ Auth Endpoints: Endpoint /auth/register not found
\`\`\`
**Solution:** Implement missing endpoints in backend

#### **CORS Issues**
\`\`\`
❌ API Connection: CORS policy error
\`\`\`
**Solution:** Configure CORS in your backend

## 🔍 Debugging

### **Check Environment Variables**
\`\`\`javascript
console.log('API URL:', process.env.REACT_APP_API_URL)
console.log('Environment:', process.env.REACT_APP_ENVIRONMENT)
\`\`\`

### **Check Network Tab**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Run tests and check for failed requests

### **Check Console**
Look for error messages in browser console

## 📊 Test Coverage

The integration tests verify:

1. **Connectivity**
   - Backend server is running
   - API is reachable
   - Response times are acceptable

2. **Endpoints**
   - Authentication endpoints exist
   - Proper HTTP status codes
   - Error handling works

3. **Data Flow**
   - Registration process
   - Login process
   - Token handling

4. **Configuration**
   - Environment variables
   - API URL configuration
   - Debug settings

## 🚀 Next Steps

Once all tests pass:
1. ✅ Your integration is working correctly
2. ✅ You can proceed with development
3. ✅ Authentication flow is functional
4. ✅ API communication is established

## 🆘 Troubleshooting

### **Backend Issues**
- Ensure backend is running on correct port
- Check backend logs for errors
- Verify database connection

### **Frontend Issues**
- Clear browser cache
- Check environment variables
- Restart development server

### **Network Issues**
- Check firewall settings
- Verify CORS configuration
- Test with different browsers

## 📞 Support

If tests continue to fail:
1. Check the troubleshooting section
2. Review backend and frontend logs
3. Verify all environment variables
4. Test endpoints manually with Postman/curl
\`\`\`
