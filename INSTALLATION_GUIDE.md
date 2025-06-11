# 🚀 Roomoree Frontend - Complete Installation Guide

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)

## 🛠️ Step-by-Step Installation

### 1. Create React App (if starting fresh)
\`\`\`bash
npx create-react-app roomoree-frontend
cd roomoree-frontend
\`\`\`

### 2. Install All Required Packages

Run this single command to install all dependencies:

\`\`\`bash
npm install @reduxjs/toolkit@^2.0.1 react-redux@^9.0.4 react-router-dom@^6.20.1 axios@^1.6.2 react-hook-form@^7.48.2 react-hot-toast@^2.4.1 lucide-react@^0.294.0
\`\`\`

**OR** install them one by one:

\`\`\`bash
# Core React packages (already included in create-react-app)
npm install react@^18.2.0 react-dom@^18.2.0 react-scripts@5.0.1

# State Management
npm install @reduxjs/toolkit@^2.0.1 react-redux@^9.0.4

# Routing
npm install react-router-dom@^6.20.1

# HTTP Client
npm install axios@^1.6.2

# Form Handling
npm install react-hook-form@^7.48.2

# Notifications
npm install react-hot-toast@^2.4.1

# Icons
npm install lucide-react@^0.294.0

# Testing (already included in create-react-app)
npm install @testing-library/jest-dom@^5.16.4 @testing-library/react@^13.3.0 @testing-library/user-event@^13.5.0

# Performance monitoring
npm install web-vitals@^2.1.4
\`\`\`

### 3. Verify Installation

Check if all packages are installed:
\`\`\`bash
npm list --depth=0
\`\`\`

You should see all these packages listed:
- @reduxjs/toolkit
- react-redux
- react-router-dom
- axios
- react-hook-form
- react-hot-toast
- lucide-react

### 4. Set Up Environment Variables

Create a \`.env\` file in your project root:
\`\`\`bash
touch .env
\`\`\`

Add these variables:
\`\`\`env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_API_TIMEOUT=10000
REACT_APP_DEBUG=true
REACT_APP_APP_NAME=Roomoree
REACT_APP_ENVIRONMENT=development
\`\`\`

### 5. Replace Default Files

Replace the contents of these files with the provided code:
- \`src/index.js\`
- \`src/index.css\`
- \`src/styles/globals.css\` (create this file)
- \`package.json\`

### 6. Create Project Structure

Create these folders and files:
\`\`\`
src/
├── components/
│   ├── common/
│   │   └── Header.js
│   └── layouts/
│       ├── AuthLayout.js
│       └── MainLayout.js
├── pages/
│   ├── auth/
│   │   ├── Login.js
│   │   └── Signup.js
│   ├── Dashboard.js
│   └── Home.js
├── store/
│   ├── slices/
│   │   └── authSlice.js
│   └── store.js
├── services/
│   ├── api.js
│   └── authService.js
└── styles/
    └── globals.css
\`\`\`

### 7. Start Development Server

\`\`\`bash
npm start
\`\`\`

The application should open at \`http://localhost:3000\`

## 🔧 Troubleshooting

### If you get dependency conflicts:
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### If styles aren't loading:
1. Clear browser cache (Ctrl+Shift+R)
2. Check if CSS files are imported in \`index.js\`
3. Restart development server

### If you get "Module not found" errors:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### If React app won't start:
1. Check Node.js version: \`node --version\` (should be 16+)
2. Check npm version: \`npm --version\`
3. Try: \`npm start -- --reset-cache\`

## 📦 Package Purposes

| Package | Purpose |
|---------|---------|
| @reduxjs/toolkit | State management (modern Redux) |
| react-redux | React bindings for Redux |
| react-router-dom | Client-side routing |
| axios | HTTP client for API calls |
| react-hook-form | Form handling and validation |
| react-hot-toast | Toast notifications |
| lucide-react | Modern icon library |

## ✅ Verification Checklist

- [ ] All packages installed without errors
- [ ] Development server starts successfully
- [ ] No console errors in browser
- [ ] CSS styles are loading properly
- [ ] All pages render correctly
- [ ] Icons are displaying
- [ ] Forms are working

## 🚀 Next Steps

1. Test the authentication flow
2. Connect to your backend API
3. Add more features as needed
4. Deploy to production

## 📞 Support

If you're still having issues:
1. Check the browser console for errors
2. Verify all files are in the correct locations
3. Ensure environment variables are set
4. Try a fresh installation
\`\`\`
