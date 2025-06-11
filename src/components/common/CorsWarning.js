"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X, ExternalLink } from "lucide-react"

const CorsWarning = () => {
  const [showWarning, setShowWarning] = useState(false)
  const [corsError, setCorsError] = useState(false)

  useEffect(() => {
    // Test for CORS issues
    const testCors = async () => {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/health`, {
          method: "GET",
        })
      } catch (error) {
        if (error.message.includes("CORS") || error.message.includes("cross-origin")) {
          setCorsError(true)
          setShowWarning(true)
        }
      }
    }

    testCors()
  }, [])

  if (!showWarning || !corsError) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "#fef2f2",
        border: "1px solid #fecaca",
        padding: "12px 16px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <AlertTriangle size={20} color="#dc2626" />
        <div>
          <p style={{ fontSize: "14px", fontWeight: "500", color: "#dc2626", margin: 0 }}>CORS Error Detected</p>
          <p style={{ fontSize: "12px", color: "#dc2626", margin: 0 }}>
            Backend doesn't allow requests from this origin. Some features may not work properly.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a
          href="#cors-solutions"
          style={{
            fontSize: "12px",
            color: "#dc2626",
            textDecoration: "underline",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          onClick={() => {
            document.getElementById("cors-solutions")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <ExternalLink size={12} />
          View Solutions
        </a>
        <button
          onClick={() => setShowWarning(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <X size={16} color="#dc2626" />
        </button>
      </div>
    </div>
  )
}

export default CorsWarning
