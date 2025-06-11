# Environment Variables Setup Guide

## 📋 Overview
This guide explains how to set up environment variables for the Roomoree frontend application.

## 🔧 Environment Files

### `.env` - Development Environment
Contains default development configuration. Safe to commit to version control.

### `.env.production` - Production Environment  
Contains production configuration. Update before deploying.

### `.env.local` - Local Overrides
Personal development overrides. **Never commit this file.**

### `.env.example` - Template
Template file showing all available environment variables.

## 🚀 Quick Setup

1. **Copy the example file:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. **Update the values in `.env` with your development keys**

3. **For local overrides, create `.env.local`:**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

## 🔑 Required API Keys

### Essential for Basic Functionality
- `REACT_APP_API_URL` - Your backend API URL
- `REACT_APP_JWT_SECRET` - JWT secret for authentication

### For Authentication Features
- `REACT_APP_GOOGLE_CLIENT_ID` - Google OAuth
- `REACT_APP_FACEBOOK_APP_ID` - Facebook OAuth

### For Payment Processing
- `REACT_APP_STRIPE_PUBLISHABLE_KEY` - Stripe payments
- `REACT_APP_PAYPAL_CLIENT_ID` - PayPal payments

### For Maps & Location
- `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps
- `REACT_APP_MAPBOX_ACCESS_TOKEN` - Mapbox (alternative)

### For File Uploads
- `REACT_APP_CLOUDINARY_CLOUD_NAME` - Cloudinary image hosting
- `REACT_APP_AWS_S3_BUCKET` - AWS S3 storage

## 🛡️ Security Notes

1. **Never commit sensitive keys to version control**
2. **Use different keys for development and production**
3. **Rotate keys regularly in production**
4. **Use `.env.local` for personal development keys**

## 🌍 Environment-Specific Configuration

### Development
\`\`\`env
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true
REACT_APP_ENABLE_ANALYTICS=false
\`\`\`

### Production
\`\`\`env
REACT_APP_ENVIRONMENT=production
REACT_APP_DEBUG=false
REACT_APP_ENABLE_ANALYTICS=true
\`\`\`

## 📝 How to Get API Keys

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Maps JavaScript API
4. Create credentials (API Key)

### Stripe
1. Sign up at [Stripe](https://stripe.com/)
2. Go to Developers > API Keys
3. Copy the Publishable Key (starts with `pk_`)

### Cloudinary
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name and create Upload Preset

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 Client ID
3. Add authorized origins

## 🔄 Loading Environment Variables

The app automatically loads environment variables in this order:
1. `.env.local` (highest priority)
2. `.env.development` / `.env.production`
3. `.env` (lowest priority)

## ✅ Verification

To verify your environment variables are loaded correctly:

\`\`\`javascript
// In your React component
console.log('API URL:', process.env.REACT_APP_API_URL);
console.log('Environment:', process.env.REACT_APP_ENVIRONMENT);
\`\`\`

## 🚨 Troubleshooting

### Variables not loading?
- Ensure they start with `REACT_APP_`
- Restart the development server after changes
- Check for typos in variable names

### Build issues?
- Verify all required variables are set
- Check `.env.production` for production builds
- Ensure no sensitive data in client-side variables

## 📞 Support

If you need help setting up environment variables, refer to the main README or contact the development team.
