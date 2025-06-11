# Roomoree Frontend

A modern React.js frontend application for the Roomoree property rental platform, built with Redux Toolkit for state management.

## Features

- 🔐 **Authentication System**: Complete login/signup with form validation
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🏗️ **Scalable Architecture**: Well-organized folder structure following best practices
- 🔄 **State Management**: Redux Toolkit for efficient state management
- 📱 **Responsive Design**: Mobile-first approach with beautiful layouts
- 🚀 **Performance Optimized**: Fast loading and smooth user experience

## Tech Stack

- **React.js** - Frontend framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **React Hook Form** - Form handling and validation
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Modern icon library

## Project Structure

\`\`\`
src/
├── components/
│   ├── common/          # Reusable components
│   └── layouts/         # Layout components
├── pages/
│   ├── auth/           # Authentication pages
│   └── ...             # Other pages
├── store/
│   ├── slices/         # Redux slices
│   └── store.js        # Store configuration
├── services/
│   ├── api.js          # Axios configuration
│   └── authService.js  # Authentication API calls
├── styles/
│   └── globals.css     # Global styles
└── App.js              # Main app component
\`\`\`

## Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd roomoree-frontend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Update the `.env` file with your API URL and other configurations.

4. **Start the development server**
   \`\`\`bash
   npm start
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## API Integration

The frontend is designed to work with a REST API. Update the `REACT_APP_API_URL` in your `.env` file to point to your backend server.

### Expected API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

## Features Implemented

### Authentication
- ✅ Login form with validation
- ✅ Signup form with validation
- ✅ Password visibility toggle
- ✅ Remember me functionality
- ✅ Social login UI (Google, Facebook)
- ✅ Form error handling
- ✅ Loading states
- ✅ Toast notifications

### State Management
- ✅ Redux store configuration
- ✅ Authentication slice
- ✅ Async thunks for API calls
- ✅ Local storage persistence
- ✅ Error handling

### UI/UX
- ✅ Responsive design
- ✅ Beautiful animations
- ✅ Modern card layouts
- ✅ Gradient backgrounds
- ✅ Icon integration
- ✅ Loading spinners

## Next Steps

This is the foundation for your Roomoree application. You can now add:

1. **Property Listings Module**
2. **Search & Filters**
3. **Booking System**
4. **User Profiles**
5. **Chat System**
6. **Payment Integration**
7. **Admin Panel**

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License.
