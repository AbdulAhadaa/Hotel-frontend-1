import api from "./api"

const healthCheckService = {
  // Check if backend is reachable
  checkBackendHealth: async () => {
    try {
      const response = await api.get("/health", { timeout: 5000 })
      return {
        status: "healthy",
        responseTime: response.headers["x-response-time"] || "unknown",
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      throw new Error(`Backend health check failed: ${error.message}`)
    }
  },

  // Check API endpoints
  checkApiEndpoints: async () => {
    const endpoints = [
      { path: "/auth/register", method: "POST" },
      { path: "/auth/login", method: "POST" },
      { path: "/auth/logout", method: "POST" },
    ]

    const results = []

    for (const endpoint of endpoints) {
      try {
        // Send empty request to check if endpoint exists
        await api.request({
          method: endpoint.method,
          url: endpoint.path,
          data: {},
          timeout: 3000,
        })
        results.push({ ...endpoint, status: "available" })
      } catch (error) {
        if (error.response?.status === 400 || error.response?.status === 422) {
          // Endpoint exists but expects valid data
          results.push({ ...endpoint, status: "available" })
        } else if (error.response?.status === 404) {
          results.push({ ...endpoint, status: "not_found" })
        } else {
          results.push({ ...endpoint, status: "error", error: error.message })
        }
      }
    }

    return results
  },

  // Test authentication flow
  testAuthFlow: async () => {
    const testUser = {
      firstName: "Test",
      lastName: "Integration",
      email: `test-${Date.now()}@example.com`,
      password: "testpassword123",
      userType: "guest",
    }

    try {
      // Test registration
      const registerResponse = await api.post("/auth/register", {
        name: `${testUser.firstName} ${testUser.lastName}`,
        email: testUser.email,
        password: testUser.password,
        role: testUser.userType,
      })

      // Test login with the same credentials
      const loginResponse = await api.post("/auth/login", {
        email: testUser.email,
        password: testUser.password,
      })

      return {
        registration: registerResponse.status === 200 || registerResponse.status === 201,
        login: loginResponse.status === 200 && loginResponse.data.access_token,
        token: loginResponse.data.access_token,
      }
    } catch (error) {
      // If user already exists, try login only
      if (error.response?.status === 400 && error.response?.data?.message?.includes("already exists")) {
        try {
          const loginResponse = await api.post("/auth/login", {
            email: testUser.email,
            password: testUser.password,
          })
          return {
            registration: "user_exists",
            login: loginResponse.status === 200 && loginResponse.data.access_token,
            token: loginResponse.data.access_token,
          }
        } catch (loginError) {
          throw new Error(`Login test failed: ${loginError.message}`)
        }
      }
      throw new Error(`Auth flow test failed: ${error.message}`)
    }
  },

  // Check environment configuration
  checkEnvironment: () => {
    const config = {
      apiUrl: process.env.REACT_APP_API_URL,
      environment: process.env.REACT_APP_ENVIRONMENT,
      debug: process.env.REACT_APP_DEBUG,
      appName: process.env.REACT_APP_APP_NAME,
    }

    const issues = []
    if (!config.apiUrl) issues.push("REACT_APP_API_URL not set")
    if (!config.environment) issues.push("REACT_APP_ENVIRONMENT not set")

    return {
      config,
      issues,
      isValid: issues.length === 0,
    }
  },
}

export default healthCheckService
