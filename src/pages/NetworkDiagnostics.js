"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Network } from "lucide-react"
import networkDiagnostics from "../utils/networkDiagnostics"

const NetworkDiagnostics = () => {
  const [tests, setTests] = useState({})
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    setTests({})

    // Test 1: Basic connectivity
    console.log("Testing basic connectivity...")
    const connectivity = await networkDiagnostics.testConnectivity()
    setTests((prev) => ({ ...prev, connectivity }))

    // Test 2: CORS check
    console.log("Testing CORS...")
    const cors = await networkDiagnostics.testCORS()
    setTests((prev) => ({ ...prev, cors }))

    // Test 3: Registration endpoint
    console.log("Testing registration endpoint...")
    const registration = await networkDiagnostics.testEndpoint("/auth/register", "POST", {
      name: "Test User",
      email: "test@example.com",
      password: "test123",
      role: "guest",
    })
    setTests((prev) => ({ ...prev, registration }))

    // Test 4: Health endpoint
    console.log("Testing health endpoint...")
    const health = await networkDiagnostics.testEndpoint("/health", "GET")
    setTests((prev) => ({ ...prev, health }))

    setIsRunning(false)
  }

  const getStatusIcon = (test) => {
    if (!test) return <AlertTriangle size={20} color="#6b7280" />
    if (test.success) return <CheckCircle size={20} color="#16a34a" />
    return <XCircle size={20} color="#dc2626" />
  }

  const getStatusColor = (test) => {
    if (!test) return "#6b7280"
    if (test.success) return "#16a34a"
    return "#dc2626"
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Network size={48} color="#2563eb" style={{ margin: "0 auto 16px" }} />
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
          Network Diagnostics
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px" }}>
          Diagnose network connectivity issues between frontend and backend
        </p>
      </div>

      {/* Configuration Info */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Current Configuration</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "14px" }}>
          <div>
            <strong>Backend URL:</strong>
            <div style={{ fontFamily: "monospace", color: "#6b7280" }}>
              {process.env.REACT_APP_API_URL || "http://localhost:3000"}
            </div>
          </div>
          <div>
            <strong>Environment:</strong>
            <div style={{ color: "#6b7280" }}>{process.env.REACT_APP_ENVIRONMENT || "development"}</div>
          </div>
        </div>
      </div>

      {/* Run Diagnostics Button */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <button
          onClick={runDiagnostics}
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
            margin: "0 auto",
          }}
        >
          {isRunning ? <RefreshCw size={16} className="animate-spin" /> : <Network size={16} />}
          {isRunning ? "Running Diagnostics..." : "Run Network Diagnostics"}
        </button>
      </div>

      {/* Test Results */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Diagnostic Results</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Connectivity Test */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {getStatusIcon(tests.connectivity)}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>Backend Connectivity</h4>
                <p style={{ fontSize: "12px", color: getStatusColor(tests.connectivity) }}>
                  {tests.connectivity?.message || "Not tested yet"}
                </p>
                {tests.connectivity?.error && (
                  <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px" }}>
                    Error: {tests.connectivity.error}
                  </p>
                )}
              </div>
            </div>
            {tests.connectivity?.status && (
              <span style={{ fontSize: "12px", color: "#6b7280" }}>Status: {tests.connectivity.status}</span>
            )}
          </div>

          {/* CORS Test */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {getStatusIcon(tests.cors)}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>CORS Configuration</h4>
                <p style={{ fontSize: "12px", color: getStatusColor(tests.cors) }}>
                  {tests.cors?.message || "Not tested yet"}
                </p>
                {tests.cors?.error && (
                  <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px" }}>Error: {tests.cors.error}</p>
                )}
              </div>
            </div>
          </div>

          {/* Registration Endpoint Test */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {getStatusIcon(tests.registration)}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>Registration Endpoint</h4>
                <p style={{ fontSize: "12px", color: getStatusColor(tests.registration) }}>
                  {tests.registration?.message || "Not tested yet"}
                </p>
                {tests.registration?.error && (
                  <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px" }}>
                    Error: {tests.registration.error}
                  </p>
                )}
                {tests.registration?.data && (
                  <details style={{ marginTop: "8px" }}>
                    <summary style={{ fontSize: "12px", color: "#6b7280", cursor: "pointer" }}>Response Data</summary>
                    <pre
                      style={{
                        fontSize: "10px",
                        background: "#f3f4f6",
                        padding: "8px",
                        borderRadius: "4px",
                        marginTop: "4px",
                        overflow: "auto",
                        maxHeight: "100px",
                      }}
                    >
                      {tests.registration.data}
                    </pre>
                  </details>
                )}
              </div>
            </div>
            {tests.registration?.status && (
              <span style={{ fontSize: "12px", color: "#6b7280" }}>Status: {tests.registration.status}</span>
            )}
          </div>

          {/* Health Endpoint Test */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {getStatusIcon(tests.health)}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>Health Endpoint</h4>
                <p style={{ fontSize: "12px", color: getStatusColor(tests.health) }}>
                  {tests.health?.message || "Not tested yet"}
                </p>
                {tests.health?.error && (
                  <p style={{ fontSize: "12px", color: "#dc2626", marginTop: "4px" }}>Error: {tests.health.error}</p>
                )}
              </div>
            </div>
            {tests.health?.status && (
              <span style={{ fontSize: "12px", color: "#6b7280" }}>Status: {tests.health.status}</span>
            )}
          </div>
        </div>
      </div>

      {/* Troubleshooting Guide */}
      <div
        style={{
          background: "#fffbeb",
          border: "1px solid #fed7aa",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "24px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#92400e", marginBottom: "12px" }}>
          Common Issues & Solutions
        </h3>
        <div style={{ fontSize: "14px", color: "#92400e" }}>
          <div style={{ marginBottom: "12px" }}>
            <strong>Backend Not Reachable:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "4px" }}>
              <li>Check if backend server is running on port 3000</li>
              <li>Verify REACT_APP_API_URL in .env file</li>
              <li>
                Try: <code>curl http://localhost:3000</code>
              </li>
            </ul>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <strong>CORS Errors:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "4px" }}>
              <li>Add CORS middleware to backend</li>
              <li>Allow origin: http://localhost:3000</li>
              <li>Check browser console for CORS errors</li>
            </ul>
          </div>
          <div>
            <strong>Registration Endpoint Issues:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "4px" }}>
              <li>Verify /auth/register endpoint exists</li>
              <li>Check request body format matches backend expectations</li>
              <li>Look at backend logs for errors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkDiagnostics
