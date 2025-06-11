# Roomoree Frontend Setup Instructions

## 🚨 Important: This is a React.js Application (NOT Next.js)

If you're getting Next.js errors, it means the system is trying to run this as a Next.js app. This is a **React.js** application using **Create React App**.

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🚀 Setup Steps

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Configuration
\`\`\`bash
# Copy the environment template
cp .env.example .env

# Edit .env file with your backend URL
REACT_APP_API_URL=http://localhost:3000
REACT_APP_DEBUG=true
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm start
\`\`\`

The application will open at `http://localhost:3000` (or the next available port).

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 🏗️ Project Structure

This is a **React.js** application with the following structure:

\`\`\`
roomoree-frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── store/             # Redux store
│   ├── services/          # API services
│   ├── styles/            # CSS files
│   ├── App.js             # Main App component
│   └── index.js           # React entry point
├── package.json           # Dependencies and scripts
└── .env                   # Environment variables
\`\`\`

## 🚨 Troubleshooting

### If you see Next.js errors:

1. **Check package.json**: Ensure it uses `react-scripts`, not `next`
2. **Delete node_modules**: `rm -rf node_modules && npm install`
3. **Clear cache**: `npm start -- --reset-cache`
4. **Check for .next folder**: Delete it if it exists (`rm -rf .next`)

### Common Issues:

1. **Port already in use**: The app will automatically use the next available port
2. **API connection errors**: Make sure your backend is running on the correct port
3. **Environment variables not loading**: Restart the development server after changing .env

## 🔗 Backend Integration

Make sure your backend is running on:
- **Development**: `http://localhost:3000`
- **API Endpoints**: 
  - `POST /auth/register` - User registration
  - `POST /auth/login` - User login

## 📱 Features

- ✅ User authentication (login/signup)
- ✅ Redux state management
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Toast notifications

## 🎯 Next Steps

1. Start your backend server
2. Run `npm start` for the frontend
3. Test the authentication flow
4. Add more features as needed

## 📞 Support

If you continue to have issues:
1. Ensure you're in the correct directory
2. Check that this is being run as a React app, not Next.js
3. Verify all dependencies are installed correctly
