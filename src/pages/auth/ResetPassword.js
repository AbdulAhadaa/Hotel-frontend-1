"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { resetPassword, clearError } from "../../store/slices/authSlice"
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react"

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isLoading, error, passwordResetSuccess } = useSelector((state) => state.auth)

  const token = searchParams.get("token")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch("newPassword")

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (passwordResetSuccess) {
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/auth/login", {
          state: {
            message: "Password reset successful! You can now log in with your new password.",
          },
        })
      }, 3000)
    }
  }, [passwordResetSuccess, navigate])

  const onSubmit = async (data) => {
    if (!token) {
      return
    }
    await dispatch(resetPassword({ token, newPassword: data.newPassword }))
  }

  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#111827", marginBottom: "16px" }}>
          Invalid Reset Link
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          The password reset link is invalid or has expired. Please request a new one.
        </p>
        <Link
          to="/auth/forgot-password"
          style={{
            padding: "10px 20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Request New Link
        </Link>
      </div>
    )
  }

  return (
    <div style={{ animation: "fadeIn 0.6s ease-out" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>Reset Password</h2>
        <p style={{ color: "#6b7280" }}>Enter your new password below</p>
      </div>

      {passwordResetSuccess ? (
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
            Password Reset Successful
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Your password has been reset successfully. You will be redirected to the login page in a few seconds.
          </p>
          <Link
            to="/auth/login"
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Go to Login
          </Link>
        </div>
      ) : (
        // Form state
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* New Password Field */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#374151", fontSize: "14px" }}
            >
              New Password
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
                placeholder="Enter new password"
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 44px",
                  border: `1px solid ${errors.newPassword ? "#ef4444" : "#d1d5db"}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = errors.newPassword ? "#ef4444" : "#d1d5db")}
                {...register("newPassword", {
                  required: "New password is required",
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
            {errors.newPassword && (
              <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#374151", fontSize: "14px" }}
            >
              Confirm Password
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
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 44px",
                  border: `1px solid ${errors.confirmPassword ? "#ef4444" : "#d1d5db"}`,
                  borderRadius: "8px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = errors.confirmPassword ? "#ef4444" : "#d1d5db")}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.confirmPassword.message}</p>
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
                Resetting Password...
              </>
            ) : (
              "Reset Password"
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

export default ResetPassword
