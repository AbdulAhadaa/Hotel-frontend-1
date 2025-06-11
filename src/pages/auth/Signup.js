"use client"

import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { registerUser, clearError } from "../../store/slices/authSlice"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, emailVerificationSent } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch("password")

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  // Redirect to verification page after successful registration
  useEffect(() => {
    if (emailVerificationSent) {
      navigate("/auth/verify-email", {
        state: {
          message: "Check your email to verify your account.",
          email: watch("email"),
        },
      })
    }
  }, [emailVerificationSent, navigate, watch])

  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data
    await dispatch(registerUser(userData))
  }

  return (
    <div style={{ animation: "fadeIn 0.6s ease-out" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>Create Account</h2>
        <p style={{ color: "#6b7280" }}>Join Roomoree and start your journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Name Field */}
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#374151", fontSize: "14px" }}
          >
            Full Name
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
              <User size={20} color="#9ca3af" />
            </div>
            <input
              type="text"
              placeholder="Enter your full name"
              style={{
                width: "100%",
                padding: "12px 16px 12px 44px",
                border: `1px solid ${errors.firstName ? "#ef4444" : "#d1d5db"}`,
                borderRadius: "8px",
                fontSize: "14px",
                backgroundColor: "white",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = errors.firstName ? "#ef4444" : "#d1d5db")}
              {...register("firstName", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
          </div>
          {errors.firstName && (
            <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.firstName.message}</p>
          )}
        </div>

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

        {/* Role Selection - Guest/Host Radio buttons */}
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#374151", fontSize: "14px" }}
          >
            I want to
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f9fafb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
            >
              <input
                type="radio"
                value="guest"
                style={{ marginRight: "12px" }}
                {...register("userType", { required: "Please select user type" })}
              />
              <div>
                <div style={{ fontWeight: "500" }}>Guest</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>Book amazing stays</div>
              </div>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f9fafb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
            >
              <input
                type="radio"
                value="host"
                style={{ marginRight: "12px" }}
                {...register("userType", { required: "Please select user type" })}
              />
              <div>
                <div style={{ fontWeight: "500" }}>Host</div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>List your space</div>
              </div>
            </label>
          </div>
          {errors.userType && (
            <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.userType.message}</p>
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
              placeholder="Create a password"
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
                padding: "12px 44px 12px 44px",
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

        {/* Terms and Conditions */}
        <div>
          <label style={{ display: "flex", alignItems: "flex-start" }}>
            <input
              type="checkbox"
              style={{ marginTop: "4px", marginRight: "12px" }}
              {...register("agreeToTerms", {
                required: "You must agree to the terms and conditions",
              })}
            />
            <span style={{ fontSize: "14px", color: "#6b7280" }}>
              I agree to the{" "}
              <Link
                to="/terms"
                style={{ color: "#2563eb", textDecoration: "none" }}
                onMouseOver={(e) => (e.target.style.color = "#3b82f6")}
                onMouseOut={(e) => (e.target.style.color = "#2563eb")}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                style={{ color: "#2563eb", textDecoration: "none" }}
                onMouseOver={(e) => (e.target.style.color = "#3b82f6")}
                onMouseOut={(e) => (e.target.style.color = "#2563eb")}
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.agreeToTerms.message}</p>
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
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Sign In Link */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Already have an account?{" "}
            <Link
              to="/auth/login"
              style={{ color: "#2563eb", fontWeight: "500", textDecoration: "none" }}
              onMouseOver={(e) => (e.target.style.color = "#3b82f6")}
              onMouseOut={(e) => (e.target.style.color = "#2563eb")}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup
