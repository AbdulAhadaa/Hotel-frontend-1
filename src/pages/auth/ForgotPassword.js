"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { forgotPassword, clearError } from "../../store/slices/authSlice"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { isLoading, error, passwordResetSent } = useSelector((state) => state.auth)
  const [email, setEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const onSubmit = async (data) => {
    setEmail(data.email)
    await dispatch(forgotPassword(data.email))
  }

  return (
    <div style={{ animation: "fadeIn 0.6s ease-out" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>Forgot Password</h2>
        <p style={{ color: "#6b7280" }}>Enter your email to receive a password reset link</p>
      </div>

      {passwordResetSent ? (
        // Success state
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#f0fdf4",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <CheckCircle size={40} color="#16a34a" />
          </div>
          <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
            Reset Link Sent
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "16px" }}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Please check your email and follow the instructions to reset your password.
          </p>
          <div style={{ marginTop: "16px", fontSize: "14px", color: "#6b7280" }}>
            <p>Didn't receive the email?</p>
            <button
              onClick={() => dispatch(forgotPassword(email))}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Resend reset link
            </button>
          </div>
        </div>
      ) : (
        // Form state
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Email Field */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#374151", fontSize: "14px" }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "12px",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <Mail size={20} color="#9ca3af" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 44px",
                  border: `1px solid ${errors.email ? "#ef4444" : "#d1d5db"}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = errors.email ? "#ef4444" : "#d1d5db")}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.email.message}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                padding: "12px 16px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px 24px",
              background: isLoading ? "#9ca3af" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = "translateY(-1px)"
                e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)"
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }
            }}
          >
            {isLoading ? (
              <>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {/* Back to Login Link */}
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Link
              to="/auth/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#6b7280",
                textDecoration: "none",
                fontSize: "14px",
              }}
              onMouseOver={(e) => (e.target.style.color = "#4b5563")}
              onMouseOut={(e) => (e.target.style.color = "#6b7280")}
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}

export default ForgotPassword
