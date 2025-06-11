# Complete Startup Guide

## 🚀 Quick Start (Recommended)

### **Option 1: Use Startup Scripts**

**Linux/Mac:**
\`\`\`bash
chmod +x start-all.sh stop-all.sh
./start-all.sh
\`\`\`

**Windows:**
\`\`\`cmd
start-all.bat
\`\`\`

### **Option 2: Manual Startup**

1. **Start MongoDB:**
   \`\`\`bash
   # Mac (with Homebrew)
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   \`\`\`

2. **Start Backend:**
   \`\`\`bash
   cd backend
   npm run dev
   \`\`\`

3. **Start Frontend (in new terminal):**
   \`\`\`bash
   cd frontend
   npm start
   \`\`\`

## 🔍 Verification Checklist

- [ ] MongoDB running (check MongoDB Compass)
- [ ] Backend running on http://localhost:3000
- [ ] Swagger docs available at http://localhost:3000/api
- [ ] Frontend running on http://localhost:3000 (or next available port)
- [ ] Integration tests pass at /test-integration

## 🚨 Troubleshooting

### **Port Conflicts**
If port 3000 is busy:
\`\`\`bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
\`\`\`

### **MongoDB Connection Issues**
\`\`\`bash
# Check MongoDB status
brew services list | grep mongodb  # Mac
systemctl status mongod            # Linux
sc query MongoDB                   # Windows
\`\`\`

### **Backend Not Starting**
1. Check if all dependencies are installed: \`npm install\`
2. Verify .env file exists and has correct values
3. Check MongoDB is running and accessible
4. Look at console output for specific errors

### **Frontend Not Connecting**
1. Verify backend is running first
2. Check REACT_APP_API_URL in frontend .env
3. Test backend directly: http://localhost:3000/api
4. Check browser console for CORS errors

## 📊 Development Workflow

### **Daily Startup:**
1. Start MongoDB (if not auto-starting)
2. Run \`./start-all.sh\` or \`start-all.bat\`
3. Wait for both servers to start
4. Open http://localhost:3000 in browser

### **Daily Shutdown:**
1. Run \`./stop-all.sh\` or \`stop-all.bat\`
2. Or press Ctrl+C in each terminal

### **Testing Changes:**
1. Backend changes: Server auto-restarts (nodemon)
2. Frontend changes: Browser auto-refreshes
3. Database changes: Use MongoDB Compass

## 🎯 Success Indicators

When everything is working correctly:

1. **Backend Console:**
   \`\`\`
   🚀 Server running on port 3000
   📊 Swagger docs available at http://localhost:3000/api
   🗄️ Connected to MongoDB: roomoree_db
   \`\`\`

2. **Frontend Console:**
   \`\`\`
   Compiled successfully!
   Local: http://localhost:3000
   \`\`\`

3. **Browser:**
   - Frontend loads without errors
   - Registration/login works
   - Integration tests pass

## 📞 Need Help?

If you're still having issues:
1. Check all prerequisites are installed
2. Verify environment files are configured
3. Test each component individually
4. Check the troubleshooting section above
\`\`\`
