// Network diagnostics utility
const networkDiagnostics = {
  // Test basic connectivity
  testConnectivity: async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL || "http://localhost:3000", {
        method: "GET",
        mode: "cors",
      })
      return {
        success: true,
        status: response.status,
        message: `Backend reachable (${response.status})`,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "Backend not reachable",
      }
    }
  },

  // Test specific endpoint
  testEndpoint: async (endpoint, method = "POST", data = {}) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(data) : undefined,
      })

      const responseData = await response.text()

      return {
        success: response.ok,
        status: response.status,
        data: responseData,
        message: `${method} ${endpoint} - ${response.status}`,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `Failed to reach ${endpoint}`,
      }
    }
  },

  // Check CORS
  testCORS: async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "OPTIONS",
      })
      return {
        success: true,
        message: "CORS preflight successful",
        headers: Object.fromEntries(response.headers.entries()),
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: "CORS preflight failed",
      }
    }
  },
}

export default networkDiagnostics
