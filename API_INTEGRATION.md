# Roomoree Frontend - Backend API Integration

## Backend API Configuration

### Base URL
- **Development**: `http://localhost:3000`
- **Production**: Update `REACT_APP_API_URL` in `.env.production`

## Authentication Endpoints

### 1. User Registration
- **Endpoint**: `POST /auth/register`
- **Frontend Method**: `authService.register()`
- **Request Format**:
  \`\`\`json
  {
    "name": "John Doe",
    "email": "john@example.com", 
    "password": "secure123",
    "role": "guest"
  }
  \`\`\`
- **Response**: User object without token (requires login after registration)
  \`\`\`json
  {
    "_id": "665f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "guest",
    "createdAt": "...",
    "updatedAt": "..."
  }
  \`\`\`

### 2. User Login
- **Endpoint**: `POST /auth/login`
- **Frontend Method**: `authService.login()`
- **Request Format**:
  \`\`\`json
  {
    "email": "john@example.com",
    "password": "secure123"
  }
  \`\`\`
- **Response**:
  \`\`\`json
  {
    "access_token": "jwt-token-here",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "guest"
    }
  }
  \`\`\`

## Token Management

### Storage
- Token stored as `access_token` in localStorage
- User data stored as `user` in localStorage

### Authorization Header
- All protected requests include: `Authorization: Bearer <access_token>`
- Automatically added by Axios interceptor

### Token Expiration
- 401 responses trigger automatic logout
- User redirected to login page
- Local storage cleared

## Frontend Integration

### Registration Flow
1. User fills signup form
2. Frontend calls `POST /auth/register`
3. Success → Redirect to login with success message and pre-filled email
4. Error → Display error message

### Login Flow
1. User fills login form
2. Frontend calls `POST /auth/login`
3. Success → Store token and user data, redirect to dashboard
4. Error → Display error message

### Logout Flow
1. Clear localStorage (`access_token` and `user`)
2. Redirect to home page
3. Show success message

## Error Handling

### Common Error Responses
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid credentials/token)
- **404**: Not Found
- **500**: Internal Server Error

### Frontend Error Handling
- All errors displayed via toast notifications
- Form validation errors shown inline
- Network errors handled gracefully

## Testing the Integration

### 1. Start Backend Server
\`\`\`bash
# Make sure your backend is running on port 3000
npm start
\`\`\`

### 2. Start Frontend
\`\`\`bash
# Frontend runs on port 3000 (or next available)
npm start
\`\`\`

### 3. Test Registration
1. Go to `/auth/signup`
2. Fill form with valid data
3. Submit → Should redirect to login with pre-filled email

### 4. Test Login
1. Go to `/auth/login`
2. Use registered credentials
3. Submit → Should redirect to dashboard

## Environment Variables

Update your `.env` file:
\`\`\`env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_AUTH_TOKEN_NAME=access_token
REACT_APP_DEBUG=true
\`\`\`

## API Endpoints Summary

| Action | Method | Endpoint | Purpose |
|--------|--------|----------|---------|
| Register | POST | `/auth/register` | Create new user account |
| Login | POST | `/auth/login` | Authenticate user and get token |

## Next Steps

1. **Add more endpoints** as your backend grows
2. **Implement refresh tokens** for better security
3. **Add role-based routing** (guest vs host vs admin)
4. **Add profile management** endpoints
5. **Add property management** endpoints
