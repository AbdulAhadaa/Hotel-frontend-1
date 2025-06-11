import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../services/authService"
import toast from "react-hot-toast"

// Async thunks for API calls
export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials)

    // Check if email is verified (based on backend response)
    if (response.data.message && response.data.message.includes("verify your email")) {
      toast.error("Please verify your email before logging in.")
      return rejectWithValue("Please verify your email before logging in.")
    }

    toast.success("Login successful!")
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Login failed"

    // Handle email verification error specifically
    if (message.includes("verify") || message.includes("verification")) {
      toast.error("Please verify your email before logging in.")
    } else {
      toast.error(message)
    }

    return rejectWithValue(message)
  }
})

export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData)
    toast.success("Check your email to verify your account.")
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Registration failed"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const verifyEmail = createAsyncThunk("auth/verifyEmail", async (token, { rejectWithValue }) => {
  try {
    const response = await authService.verifyEmail(token)
    toast.success("Email verified successfully! You can now log in.")
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Email verification failed"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const resendVerification = createAsyncThunk("auth/resendVerification", async (email, { rejectWithValue }) => {
  try {
    const response = await authService.resendVerification(email)
    toast.success("Verification email resent.")
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to resend verification email"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await authService.forgotPassword(email)
    toast.success("Reset link sent to your email.")
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to send reset link"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(token, newPassword)
      toast.success("Password updated successfully!")
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to reset password"
      toast.error(message)
      return rejectWithValue(message)
    }
  },
)

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getCurrentUser()
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to get user data"
    return rejectWithValue(message)
  }
})

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await authService.logout()
    toast.success("Logged out successfully")
    return null
  } catch (error) {
    const message = error.response?.data?.message || "Logout failed"
    toast.error(message)
    return rejectWithValue(message)
  }
})

// Get user from localStorage
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  } catch (error) {
    return null
  }
}

const initialState = {
  user: getUserFromStorage(),
  token: localStorage.getItem("access_token"),
  isAuthenticated: !!localStorage.getItem("access_token"),
  isLoading: false,
  error: null,
  emailVerificationSent: false,
  emailVerified: false,
  passwordResetSent: false,
  passwordResetSuccess: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload
      state.user = user
      state.token = access_token
      state.isAuthenticated = true
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("access_token", access_token)
    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.emailVerificationSent = false
      state.emailVerified = false
      state.passwordResetSent = false
      state.passwordResetSuccess = false
      localStorage.removeItem("user")
      localStorage.removeItem("access_token")
    },
    setEmailVerificationSent: (state, action) => {
      state.emailVerificationSent = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.access_token
        state.isAuthenticated = true
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        localStorage.setItem("access_token", action.payload.access_token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.emailVerificationSent = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Email Verification
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false
        state.emailVerified = true
        state.error = null
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Resend Verification
      .addCase(resendVerification.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.passwordResetSent = false
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false
        state.passwordResetSent = true
        state.error = null
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.passwordResetSent = false
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.passwordResetSuccess = false
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false
        state.passwordResetSuccess = true
        state.error = null
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.passwordResetSuccess = false
      })
      // Get Current User
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.isLoading = false
        state.emailVerificationSent = false
        state.emailVerified = false
        state.passwordResetSent = false
        state.passwordResetSuccess = false
        localStorage.removeItem("user")
        localStorage.removeItem("access_token")
      })
  },
})

export const { clearError, setCredentials, clearCredentials, setEmailVerificationSent } = authSlice.actions
export default authSlice.reducer
