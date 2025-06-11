"use client"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUser } from "../../store/slices/authSlice"
import { Home, User, LogOut } from "lucide-react"

const Header = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header className="header-fixed">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <Home style={{ color: "#2563eb" }} size={24} />
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#1f2937",
              }}
            >
              Roomoree
            </span>
          </Link>

          {/* User menu */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <User size={20} style={{ color: "#6b7280" }} />
              <span style={{ fontSize: "14px", color: "#374151" }}>Welcome, {user?.name || "User"}</span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                fontSize: "14px",
                color: "#6b7280",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.15s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#1f2937")}
              onMouseOut={(e) => (e.target.style.color = "#6b7280")}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
