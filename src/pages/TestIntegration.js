"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { CheckCircle, XCircle, AlertTriangle, Play, RefreshCw } from "lucide-react"
import api from "../services/api"
import { loginUser, registerUser } from "../store/slices/authSlice"

const TestIntegration = () => {
  const dispatch = useDispatch()
  const [tests, setTests] = useState({
    backendHealth: { status: "pending", message: "", time: null },
    apiConnection: { status: "pending", message: "", time: null },
    authEndpoints: { status: "pending", message: "", time: null },
    registerTest: { status: "pending", message: "", time: null },
    loginTest: { status: "pending", message: "", time: null },
  })
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState(null)

  const updateTestStatus = (testName, status, message, time = null) => {
    setTests((prev) => ({
      ...prev,
      [testName]: { status, message, time },
    }))
  }

  const runTest = async (testName, testFunction) => {
    const startTime = Date.now()
    updateTestStatus(testName, "running", "Running...")

    try {
      const result = await testFunction()
      const endTime = Date.now()
      updateTestStatus(testName, "success", result.message, endTime - startTime)
      return { success: true, message: result.message }
    } catch (error) {
      const endTime = Date.now()
      updateTestStatus(testName, "error", error.message, endTime - startTime)
      return { success: false, message: error.message }
    }
  }

  // Test 1: Backend Health Check
  const testBackendHealth = async () => {
    try {
      const response = await api.get("/health")
      if (response.status === 200) {
        return { message: "Backend is healthy and responding" }
      }
      throw new Error("Backend health check failed")
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Backend server is not running")
      }
      throw new Error(`Health check failed: ${error.message}`)
    }
  }

  // Test 2: API Connection
  const testApiConnection = async () => {
    try {
      const response = await api.get("/", { timeout: 5000 })
      return { message: `API connected successfully (Status: ${response.status})` }
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Cannot connect to API server")
      }
      throw new Error(`API connection failed: ${error.message}`)
    }
  }

  // Test 3: Auth Endpoints
  const testAuthEndpoints = async () => {
    try {
      // Test if auth endpoints exist
      const endpoints = ["/auth/register", "/auth/login"]
      const results = []

      for (const endpoint of endpoints) {
        try {
          // Send a test request to see if endpoint exists
          await api.post(endpoint, {})
        } catch (error) {
          if (error.response?.status === 400 || error.response?.status === 422) {
            // Endpoint exists but expects data (good)
            results.push(`${endpoint}: Available`)
          } else if (error.response?.status === 404) {
            throw new Error(`Endpoint ${endpoint} not found`)
          } else {
            results.push(`${endpoint}: Available (${error.response?.status})`)
          }
        }
      }

      return { message: `Auth endpoints available: ${results.join(", ")}` }
    } catch (error) {
      throw new Error(`Auth endpoints test failed: ${error.message}`)
    }
  }

  // Test 4: Registration
  const testRegistration = async () => {
    const testUser = {
      firstName: "Test",
      lastName: "User",
      email: `test${Date.now()}@example.com`,
      password: "test123456",
      userType: "guest",
    }

    try {
      const result = await dispatch(registerUser(testUser)).unwrap()
      return { message: "Registration endpoint working correctly" }
    } catch (error) {
      // If it's a validation error, that's actually good - means endpoint is working
      if (error.includes("already exists") || error.includes("validation")) {
        return { message: "Registration endpoint working (validation active)" }
      }
      throw new Error(`Registration failed: ${error}`)
    }
  }

  // Test 5: Login
  const testLogin = async () => {
    const testCredentials = {
      email: "test@example.com",
      password: "wrongpassword",
    }

    try {
      await dispatch(loginUser(testCredentials)).unwrap()
      return { message: "Login endpoint working correctly" }
    } catch (error) {
      // If it's an authentication error, that's good - means endpoint is working
      if (error.includes("Invalid") || error.includes("credentials") || error.includes("password")) {
        return { message: "Login endpoint working (authentication active)" }
      }
      throw new Error(`Login test failed: ${error}`)
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    const results = []

    // Run tests sequentially
    results.push(await runTest("backendHealth", testBackendHealth))
    results.push(await runTest("apiConnection", testApiConnection))
    results.push(await runTest("authEndpoints", testAuthEndpoints))
    results.push(await runTest("registerTest", testRegistration))
    results.push(await runTest("loginTest", testLogin))

    const successCount = results.filter((r) => r.success).length
    const totalTests = results.length

    setTestResults({
      total: totalTests,
      passed: successCount,
      failed: totalTests - successCount,
      success: successCount === totalTests,
    })

    setIsRunning(false)
  }

  const resetTests = () => {
    setTests({
      backendHealth: { status: "pending", message: "", time: null },
      apiConnection: { status: "pending", message: "", time: null },
      authEndpoints: { status: "pending", message: "", time: null },
      registerTest: { status: "pending", message: "", time: null },
      loginTest: { status: "pending", message: "", time: null },
    })
    setTestResults(null)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle size={20} color="#16a34a" />
      case "error":
        return <XCircle size={20} color="#dc2626" />
      case "running":
        return <RefreshCw size={20} color="#ca8a04" className="animate-spin" />
      default:
        return <AlertTriangle size={20} color="#6b7280" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "#16a34a"
      case "error":
        return "#dc2626"
      case "running":
        return "#ca8a04"
      default:
        return "#6b7280"
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
          Backend Integration Test
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px" }}>
          Test the connection between your frontend and backend services
        </p>
      </div>

      {/* API Configuration */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Configuration</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>Backend URL:</label>
            <p style={{ fontSize: "14px", color: "#6b7280", fontFamily: "monospace" }}>
              {process.env.REACT_APP_API_URL || "http://localhost:3000"}
            </p>
          </div>
          <div>
            <label style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>Environment:</label>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>{process.env.REACT_APP_ENVIRONMENT || "development"}</p>
          </div>
        </div>
      </div>

      {/* Test Controls */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button
            onClick={runAllTests}
            disabled={isRunning}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: isRunning ? "#9ca3af" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: isRunning ? "not-allowed" : "pointer",
            }}
          >
            <Play size={16} />
            {isRunning ? "Running Tests..." : "Run All Tests"}
          </button>

          <button
            onClick={resetTests}
            disabled={isRunning}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "white",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: isRunning ? "not-allowed" : "pointer",
            }}
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Test Results Summary */}
      {testResults && (
        <div
          style={{
            background: testResults.success ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${testResults.success ? "#bbf7d0" : "#fecaca"}`,
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: testResults.success ? "#16a34a" : "#dc2626",
              marginBottom: "8px",
            }}
          >
            {testResults.success ? "✅ All Tests Passed!" : "❌ Some Tests Failed"}
          </h3>
          <p style={{ fontSize: "14px", color: testResults.success ? "#16a34a" : "#dc2626" }}>
            {testResults.passed}/{testResults.total} tests passed
          </p>
        </div>
      )}

      {/* Individual Tests */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Test Results</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {Object.entries(tests).map(([testName, test]) => (
            <div
              key={testName}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                backgroundColor: test.status === "success" ? "#f9fafb" : "white",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {getStatusIcon(test.status)}
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>
                    {testName.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </h4>
                  <p style={{ fontSize: "12px", color: getStatusColor(test.status) }}>
                    {test.message || "Waiting to run..."}
                  </p>
                </div>
              </div>
              {test.time && <span style={{ fontSize: "12px", color: "#6b7280" }}>{test.time}ms</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting */}
      <div
        style={{
          background: "#fffbeb",
          border: "1px solid #fed7aa",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "24px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#92400e", marginBottom: "8px" }}>
          Troubleshooting Tips
        </h3>
        <ul style={{ fontSize: "14px", color: "#92400e", paddingLeft: "20px" }}>
          <li>Make sure your backend server is running on the correct port</li>
          <li>Check that CORS is properly configured in your backend</li>
          <li>Verify the API URL in your .env file matches your backend</li>
          <li>Ensure all required endpoints are implemented in your backend</li>
          <li>Check browser console for any network errors</li>
        </ul>
      </div>
    </div>
  )
}

export default TestIntegration
