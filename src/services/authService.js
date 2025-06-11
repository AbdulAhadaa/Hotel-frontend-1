import api from "./api"

const authService = {
  // Register user - POST /auth/register
  register: async (userData) => {
    const response = await api.post("/auth/register", {
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.password,
      role: userData.userType || "guest", // guest or host
    })
    return response
  },

  // Login user - POST /auth/login
  login: async (credentials) => {
    const response = await api.post("/auth/login", {
      email: credentials.email,
      password: credentials.password,
    })
    return response
  },

  // Verify email - GET /auth/verify-email?token=<verificationToken>
  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verify-email?token=${token}`)
    return response
  },

  // Resend verification email - POST /auth/resend-verification
  resendVerification: async (email) => {
    const response = await api.post("/auth/resend-verification", {
      email: email,
    })
    return response
  },

  // Get current user - GET /users/me
  getCurrentUser: async () => {
    const response = await api.get("/users/me")
    return response
  },

  // Forgot password - POST /auth/forgot-password
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", {
      email: email,
    })
    return response
  },

  // Reset password - POST /auth/reset-password
  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      token: token,
      newPassword: newPassword,
    })
    return response
  },

  // Logout user (client-side only)
  logout: async () => {
    // Clear local storage
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    return Promise.resolve()
  },
}

export default authService
