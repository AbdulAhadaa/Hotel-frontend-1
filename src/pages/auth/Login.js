"use client"

import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { loginUser, clearError, resendVerification } from "../../store/slices/authSlice"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const { isLoading, error } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const email = watch("email")

  useEffect(() => {
    dispatch(clearError())
    if (location.state?.email) {
      setValue("email", location.state.email)
    }
  }, [dispatch, location.state?.email, setValue])

  const onSubmit = (data) => {
    dispatch(loginUser({ ...data, rememberMe }))
  }

  const handleResendVerification = () => {
    if (email) {
      dispatch(resendVerification(email))
    }
  }

  const registrationMessage = location.state?.message
  const isEmailVerificationError = error && error.includes("verify")

  return (
    <div style={{ animation: "fadeIn 0.6s ease-out" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>Welcome Back</h2>
        <p style={{ color: "#6b7280" }}>Sign in to your Roomoree account</p>
      </div>

      {/* Registration Success Message */}
      {registrationMessage && (
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            color: "#16a34a",
            padding: "12px 16px",
            borderRadius: "6px",
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          {registrationMessage}
        </div>
      )}

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

        {/* Password Field */}
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#374151", fontSize: "14px" }}
          >
            Password
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
              <Lock size={20} color="#9ca3af" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px 44px 12px 44px",
                border: `1px solid ${errors.password ? "#ef4444" : "#d1d5db"}`,
                borderRadius: "8px",
                fontSize: "14px",
                backgroundColor: "white",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = errors.password ? "#ef4444" : "#d1d5db")}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              style={{
                position: "absolute",
                top: "50%",
                right: "12px",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
            </button>
          </div>
          {errors.password && (
            <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ width: "16px", height: "16px", marginRight: "8px" }}
            />
            <label htmlFor="remember-me" style={{ fontSize: "14px", color: "#374151" }}>
              Remember me
            </label>
          </div>
          <Link
            to="/auth/forgot-password"
            style={{ fontSize: "14px", color: "#2563eb", textDecoration: "none" }}
            onMouseOver={(e) => (e.target.style.color = "#3b82f6")}
            onMouseOut={(e) => (e.target.style.color = "#2563eb")}
          >
            Forgot password?
          </Link>
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
            {isEmailVerificationError && email && (
              <div style={{ marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2563eb",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Resend verification email
                </button>
              </div>
            )}
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
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Social Login Placeholder */}
        <div style={{ marginTop: "24px" }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: "#d1d5db",
              }}
            ></div>
            <div
              style={{
                position: "relative",
                textAlign: "center",
                backgroundColor: "#f8fafc",
                padding: "0 16px",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Or continue with
            </div>
          </div>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                fontSize: "14px",
                cursor: "pointer",
                transition: "color 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.color = "#374151")}
              onMouseOut={(e) => (e.target.style.color = "#6b7280")}
            >
              Social Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
