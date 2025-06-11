import axios from "axios"
import store from "../store/store"
import { clearCredentials } from "../store/slices/authSlice"

// Create axios instance with enhanced error handling
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: Number.parseInt(process.env.REACT_APP_API_TIMEOUT || "10000", 10),
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token and enhanced logging
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Enhanced debug logging
    if (process.env.REACT_APP_DEBUG === "true") {
      console.group(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`)
      console.log("📍 Full URL:", `${config.baseURL}${config.url}`)
      console.log("📋 Headers:", config.headers)
      console.log("📦 Data:", config.data)
      console.log("⏱️ Timeout:", config.timeout)
      console.groupEnd()
    }

    return config
  },
  (error) => {
    if (process.env.REACT_APP_DEBUG === "true") {
      console.error("❌ API Request Error:", error)
    }
    return Promise.reject(error)
  },
)

// Response interceptor with detailed error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.REACT_APP_DEBUG === "true") {
      console.group(`✅ API Response: ${response.status} ${response.config.url}`)
      console.log("📊 Status:", response.status)
      console.log("📋 Headers:", response.headers)
      console.log("📦 Data:", response.data)
      console.groupEnd()
    }
    return response
  },
  (error) => {
    // Enhanced error logging
    if (process.env.REACT_APP_DEBUG === "true") {
      console.group(`❌ API Error: ${error.config?.url || "Unknown"}`)
      console.log("🔗 Request URL:", error.config?.url)
      console.log("📍 Full URL:", `${error.config?.baseURL}${error.config?.url}`)
      console.log("📊 Status:", error.response?.status)
      console.log("📋 Response Headers:", error.response?.headers)
      console.log("📦 Response Data:", error.response?.data)
      console.log("🔍 Error Message:", error.message)
      console.log("🌐 Network Error:", error.code)

      // Check for specific network issues
      if (error.code === "ECONNREFUSED") {
        console.log("🚨 Connection Refused - Backend server is not running")
      } else if (error.code === "NETWORK_ERROR") {
        console.log("🚨 Network Error - Check internet connection")
      } else if (error.message.includes("CORS")) {
        console.log("🚨 CORS Error - Check backend CORS configuration")
      }

      console.groupEnd()
    }

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      store.dispatch(clearCredentials())
      localStorage.removeItem("access_token")
      localStorage.removeItem("user")

      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes("/auth")) {
        window.location.href = "/auth/login"
      }
    }

    // Enhance error message for better user experience
    const enhancedError = error

    if (error.code === "ECONNREFUSED") {
      enhancedError.message = "Cannot connect to server. Please check if the backend is running."
    } else if (error.code === "NETWORK_ERROR") {
      enhancedError.message = "Network error. Please check your internet connection."
    } else if (error.message.includes("timeout")) {
      enhancedError.message = "Request timeout. The server is taking too long to respond."
    } else if (!error.response) {
      enhancedError.message = "Network error. Cannot reach the server."
    }

    return Promise.reject(enhancedError)
  },
)

export default api
