"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, ExternalLink, Copy, Download } from "lucide-react"

const CorsWorkarounds = () => {
  const [copiedCode, setCopiedCode] = useState("")

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const corsMiddlewareCode = `const cors = require('cors');

// Basic CORS setup
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Or allow all origins (development only)
app.use(cors());`

  const packageJsonProxy = `{
  "name": "roomoree-frontend",
  "proxy": "http://localhost:3000",
  "dependencies": {
    // ... your dependencies
  }
}`

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <AlertTriangle size={48} color="#f59e0b" style={{ margin: "0 auto 16px" }} />
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
          CORS Workarounds
        </h1>
        <p style={{ color: "#6b7280", fontSize: "16px" }}>
          Solutions to connect frontend and backend without CORS setup
        </p>
      </div>

      {/* Solution 1: Add CORS to Backend */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <CheckCircle size={24} color="#16a34a" />
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
            Solution 1: Add CORS to Backend (Recommended)
          </h2>
        </div>

        <p style={{ color: "#6b7280", marginBottom: "16px" }}>
          The best solution is to add CORS middleware to your backend. This is a 2-minute fix:
        </p>

        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px" }}>Step 1: Install CORS</h3>
          <div
            style={{
              background: "#f3f4f6",
              padding: "12px",
              borderRadius: "6px",
              fontFamily: "monospace",
              fontSize: "14px",
              position: "relative",
            }}
          >
            npm install cors
            <button
              onClick={() => copyToClipboard("npm install cors", "install")}
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {copiedCode === "install" ? <CheckCircle size={16} color="#16a34a" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px" }}>Step 2: Add to your backend</h3>
          <div
            style={{
              background: "#f3f4f6",
              padding: "12px",
              borderRadius: "6px",
              fontFamily: "monospace",
              fontSize: "12px",
              position: "relative",
              overflow: "auto",
            }}
          >
            <pre>{corsMiddlewareCode}</pre>
            <button
              onClick={() => copyToClipboard(corsMiddlewareCode, "cors")}
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {copiedCode === "cors" ? <CheckCircle size={16} color="#16a34a" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <div
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "14px",
            color: "#16a34a",
          }}
        >
          ✅ After adding this code, restart your backend and the CORS error will be fixed!
        </div>
      </div>

      {/* Solution 2: Development Proxy */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <AlertTriangle size={24} color="#f59e0b" />
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
            Solution 2: Development Proxy (Temporary)
          </h2>
        </div>

        <p style={{ color: "#6b7280", marginBottom: "16px" }}>
          Add a proxy to your React app's package.json to route API calls through the development server:
        </p>

        <div
          style={{
            background: "#f3f4f6",
            padding: "12px",
            borderRadius: "6px",
            fontFamily: "monospace",
            fontSize: "12px",
            position: "relative",
            overflow: "auto",
          }}
        >
          <pre>{packageJsonProxy}</pre>
          <button
            onClick={() => copyToClipboard(packageJsonProxy, "proxy")}
            style={{
              position: "absolute",
              right: "8px",
              top: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {copiedCode === "proxy" ? <CheckCircle size={16} color="#16a34a" /> : <Copy size={16} />}
          </button>
        </div>

        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fed7aa",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "14px",
            color: "#92400e",
            marginTop: "12px",
          }}
        >
          ⚠️ After adding the proxy, restart your React app with <code>npm start</code>
        </div>
      </div>

      {/* Solution 3: Browser Extension */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <ExternalLink size={24} color="#6366f1" />
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
            Solution 3: Browser Extension (Quick Test)
          </h2>
        </div>

        <p style={{ color: "#6b7280", marginBottom: "16px" }}>
          For quick testing, you can disable CORS in your browser using an extension:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>Chrome:</span>
            <a
              href="https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px" }}
            >
              CORS Unblock Extension
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "500" }}>Firefox:</span>
            <a
              href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2563eb", textDecoration: "none", fontSize: "14px" }}
            >
              CORS Everywhere Extension
            </a>
          </div>
        </div>

        <div
          style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            padding: "12px",
            fontSize: "14px",
            color: "#dc2626",
            marginTop: "12px",
          }}
        >
          ⚠️ Only use browser extensions for development. Never use them in production!
        </div>
      </div>

      {/* Solution 4: Same Origin */}
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <Download size={24} color="#8b5cf6" />
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#111827" }}>
            Solution 4: Serve Frontend from Backend
          </h2>
        </div>

        <p style={{ color: "#6b7280", marginBottom: "16px" }}>
          Build your React app and serve it from your backend server to avoid CORS entirely:
        </p>

        <div style={{ fontSize: "14px", color: "#374151" }}>
          <ol style={{ paddingLeft: "20px" }}>
            <li style={{ marginBottom: "8px" }}>
              Build your React app: <code style={{ background: "#f3f4f6", padding: "2px 4px" }}>npm run build</code>
            </li>
            <li style={{ marginBottom: "8px" }}>
              Copy the <code style={{ background: "#f3f4f6", padding: "2px 4px" }}>build</code> folder to your backend
            </li>
            <li style={{ marginBottom: "8px" }}>
              Serve static files from your backend:
              <div
                style={{
                  background: "#f3f4f6",
                  padding: "8px",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                app.use(express.static('build'));
              </div>
            </li>
            <li>Access your app at the same URL as your backend</li>
          </ol>
        </div>
      </div>

      {/* Current Status */}
      <div
        id="cors-solutions"
        style={{
          background: "#f8fafc",
          borderRadius: "8px",
          padding: "24px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
          Recommended Action
        </h2>
        <p style={{ color: "#374151", marginBottom: "16px" }}>
          The fastest and most reliable solution is to add CORS middleware to your backend (Solution 1). It takes less
          than 2 minutes and fixes the issue permanently.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => copyToClipboard("npm install cors", "quick")}
            style={{
              padding: "8px 16px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {copiedCode === "quick" ? <CheckCircle size={16} /> : <Copy size={16} />}
            Copy Install Command
          </button>
        </div>
      </div>
    </div>
  )
}

export default CorsWorkarounds
