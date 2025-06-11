"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertCircle, Wifi, WifiOff } from "lucide-react"
import api from "../../services/api"

const ConnectionStatus = () => {
  const [status, setStatus] = useState({
    backend: "checking", // checking, connected, error
    lastChecked: null,
    error: null,
    responseTime: null,
  })

  const checkBackendConnection = async () => {
    const startTime = Date.now()
    setStatus((prev) => ({ ...prev, backend: "checking" }))

    try {
      // Try to ping the backend
      const response = await api.get("/health", { timeout: 5000 })
      const responseTime = Date.now() - startTime

      setStatus({
        backend: "connected",
        lastChecked: new Date(),
        error: null,
        responseTime,
      })
    } catch (error) {
      setStatus({
        backend: "error",
        lastChecked: new Date(),
        error: error.message || "Connection failed",
        responseTime: null,
      })
    }
  }

  useEffect(() => {
    checkBackendConnection()
    // Check every 30 seconds
    const interval = setInterval(checkBackendConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (status.backend) {
      case "connected":
        return <CheckCircle size={16} color="#16a34a" />
      case "error":
        return <XCircle size={16} color="#dc2626" />
      case "checking":
        return <AlertCircle size={16} color="#ca8a04" />
      default:
        return <WifiOff size={16} color="#6b7280" />
    }
  }

  const getStatusColor = () => {
    switch (status.backend) {
      case "connected":
        return "#16a34a"
      case "error":
        return "#dc2626"
      case "checking":
        return "#ca8a04"
      default:
        return "#6b7280"
    }
  }

  const getStatusText = () => {
    switch (status.backend) {
      case "connected":
        return `Connected (${status.responseTime}ms)`
      case "error":
        return "Disconnected"
      case "checking":
        return "Checking..."
      default:
        return "Unknown"
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "12px 16px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        zIndex: 1000,
      }}
    >
      {getStatusIcon()}
      <span style={{ color: getStatusColor(), fontWeight: "500" }}>Backend: {getStatusText()}</span>
      <button
        onClick={checkBackendConnection}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
        }}
        title="Refresh connection"
      >
        <Wifi size={14} color="#6b7280" />
      </button>
    </div>
  )
}

export default ConnectionStatus
