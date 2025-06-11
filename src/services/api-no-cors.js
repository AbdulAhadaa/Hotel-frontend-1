// Alternative API service that bypasses CORS issues
import axios from "axios"

// Create axios instance with CORS workarounds
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
  timeout: Number.parseInt(process.env.REACT_APP_API_TIMEOUT || "10000", 10),
  headers: {
    "Content-Type": "application/json",
  },
})

// Alternative fetch-based API for CORS issues
const apiNoCors = {
  // Method 1: Using fetch with no-cors mode (limited functionality)
  fetchNoCors: async (url, options = {}) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        ...options,
        mode: "no-cors", // This bypasses CORS but limits response access
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      })

      // Note: In no-cors mode, you can't read the response body
      // You can only check if the request was sent
      return {
        ok: true,
        status: "unknown", // Can't read status in no-cors mode
        message: "Request sent (no-cors mode)",
      }
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`)
    }
  },

  // Method 2: Using a proxy approach
  proxyRequest: async (url, options = {}) => {
    try {
      // This would require a proxy server or browser extension
      const proxyUrl = `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_API_URL}${url}`

      const response = await fetch(proxyUrl, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      throw new Error(`Proxy request failed: ${error.message}`)
    }
  },

  // Method 3: JSONP approach (for GET requests only)
  jsonpRequest: (url, callback) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script")
      const callbackName = `jsonp_callback_${Date.now()}`

      window[callbackName] = (data) => {
        document.head.removeChild(script)
        delete window[callbackName]
        resolve(data)
      }

      script.onerror = () => {
        document.head.removeChild(script)
        delete window[callbackName]
        reject(new Error("JSONP request failed"))
      }

      script.src = `${process.env.REACT_APP_API_URL}${url}?callback=${callbackName}`
      document.head.appendChild(script)
    })
  },
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (process.env.REACT_APP_DEBUG === "true") {
      console.group(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`)
      console.log("📍 Full URL:", `${config.baseURL}${config.url}`)
      console.log("📋 Headers:", config.headers)
      console.log("📦 Data:", config.data)
      console.groupEnd()
    }

    return config
  },
  (error) => {
    console.error("❌ API Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor with CORS error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.REACT_APP_DEBUG === "true") {
      console.group(`✅ API Response: ${response.status} ${response.config.url}`)
      console.log("📊 Status:", response.status)
      console.log("📦 Data:", response.data)
      console.groupEnd()
    }
    return response
  },
  (error) => {
    if (process.env.REACT_APP_DEBUG === "true") {
      console.group(`❌ API Error: ${error.config?.url || "Unknown"}`)
      console.log("🔍 Error Message:", error.message)
      console.log("📊 Status:", error.response?.status)
      console.log("📦 Response Data:", error.response?.data)

      // Check for CORS-specific errors
      if (error.message.includes("CORS") || error.message.includes("cross-origin")) {
        console.log("🚨 CORS Error Detected!")
        console.log("💡 Possible solutions:")
        console.log("   1. Add CORS middleware to backend")
        console.log("   2. Use browser extension to disable CORS")
        console.log("   3. Use development proxy")
        console.log("   4. Run backend and frontend on same origin")
      }

      console.groupEnd()
    }

    // Handle CORS errors specifically
    if (error.message.includes("CORS") || error.message.includes("cross-origin")) {
      const corsError = new Error(
        "CORS Error: Backend doesn't allow requests from this origin. Please add CORS middleware to your backend or use one of the workarounds.",
      )
      corsError.isCorsError = true
      return Promise.reject(corsError)
    }

    return Promise.reject(error)
  },
)

// Export both regular API and no-cors alternatives
export default api
export { apiNoCors }
