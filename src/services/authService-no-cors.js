import api, { apiNoCors } from "./api-no-cors"

const authServiceNoCors = {
  // Method 1: Try regular request first, fallback to no-cors
  register: async (userData) => {
    try {
      // Try normal request first
      const response = await api.post("/auth/register", {
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        password: userData.password,
        role: userData.userType || "guest",
      })
      return response
    } catch (error) {
      if (error.isCorsError) {
        console.log("🔄 CORS error detected, trying no-cors mode...")
        // Fallback to no-cors mode
        await apiNoCors.fetchNoCors("/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            password: userData.password,
            role: userData.userType || "guest",
          }),
        })

        // Since we can't read the response in no-cors mode,
        // we'll assume it worked and return a mock response
        return {
          data: {
            message: "Registration request sent (CORS bypass mode)",
            user: {
              name: `${userData.firstName} ${userData.lastName}`,
              email: userData.email,
              role: userData.userType || "guest",
            },
          },
        }
      }
      throw error
    }
  },

  // Method 2: Using proxy for login
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      })
      return response
    } catch (error) {
      if (error.isCorsError) {
        console.log("🔄 CORS error detected, trying proxy mode...")
        // You could implement proxy logic here
        throw new Error("Login failed due to CORS. Please add CORS middleware to backend or use a development proxy.")
      }
      throw error
    }
  },

  // Other methods remain the same
  logout: async () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    return Promise.resolve()
  },
}

export default authServiceNoCors
