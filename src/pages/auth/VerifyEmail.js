"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { verifyEmail, resendVerification, clearError } from "../../store/slices/authSlice"
import { CheckCircle, XCircle, Mail, RefreshCw } from "lucide-react"

const VerifyEmail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { isLoading, error, emailVerified } = useSelector((state) => state.auth)
  const [verificationStatus, setVerificationStatus] = useState("pending") // pending, success, error

  const token = searchParams.get("token")
  const email = location.state?.email || ""
  const message = location.state?.message || ""

  useEffect(() => {
    dispatch(clearError())

    // If there's a token in the URL, verify the email automatically
    if (token) {
      handleVerifyEmail(token)
    }
  }, [token, dispatch])

  useEffect(() => {
    if (emailVerified) {
      setVerificationStatus("success")
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/auth/login", {
          state: {
            message: "Email verified successfully! You can now log in.",
            email: email,
          },
        })
      }, 3000)
    }
  }, [emailVerified, navigate, email])

  const handleVerifyEmail = async (verificationToken) => {
    try {
      await dispatch(verifyEmail(verificationToken)).unwrap()
      setVerificationStatus("success")
    } catch (error) {
      setVerificationStatus("error")
    }
  }

  const handleResendVerification = () => {
    if (email) {
      dispatch(resendVerification(email))
    }
  }

  const handleGoToLogin = () => {
    navigate("/auth/login", { state: { email } })
  }

  return (
    <div style={{ animation: "fadeIn 0.6s ease-out" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "30px", fontWeight: "bold", color: "#111827", marginBottom: "8px" }}>
          Email Verification
        </h2>
        <p style={{ color: "#6b7280" }}>Verify your email address to continue</p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "32px",
          textAlign: "center",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Verification Status */}
        {verificationStatus === "pending" && !token && (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#eff6ff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <Mail size={40} color="#2563eb" />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#111827", marginBottom: "8px" }}>
              Check Your Email
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "24px", lineHeight: "1.6" }}>
              {message ||
                "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."}
            </p>
            {email && (
              <p style={{ fontSize: "14px", color: "#374151", marginBottom: "24px" }}>
                Sent to: <strong>{email}</strong>
              </p>
            )}
          </>
        )}

        {verificationStatus === "success" && (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#f0fdf4",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <CheckCircle size={40} color="#16a34a" />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#16a34a", marginBottom: "8px" }}>
              Email Verified Successfully!
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Your email has been verified. You can now log in to your account.
            </p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>Redirecting to login page in 3 seconds...</p>
          </>
        )}

        {verificationStatus === "error" && (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#fef2f2",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <XCircle size={40} color="#dc2626" />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#dc2626", marginBottom: "8px" }}>
              Verification Failed
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              {error || "The verification link is invalid or has expired. Please request a new verification email."}
            </p>
          </>
        )}

        {isLoading && token && (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#fffbeb",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <RefreshCw size={40} color="#ca8a04" className="animate-spin" />
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#ca8a04", marginBottom: "8px" }}>
              Verifying Email...
            </h3>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>Please wait while we verify your email address.</p>
          </>
        )}

        {/* Action Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {verificationStatus === "pending" && !token && email && (
            <button
              onClick={handleResendVerification}
              disabled={isLoading}
              style={{
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
            >
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail size={16} />
                  Resend Verification Email
                </>
              )}
            </button>
          )}

          {(verificationStatus === "error" || verificationStatus === "success") && (
            <button
              onClick={handleGoToLogin}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-1px)"
                e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)"
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)"
                e.target.style.boxShadow = "none"
              }}
            >
              Go to Login
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 24px",
              background: "white",
              color: "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f9fafb"
              e.target.style.borderColor = "#9ca3af"
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white"
              e.target.style.borderColor = "#d1d5db"
            }}
          >
            Back to Home
          </button>
        </div>

        {/* Help Text */}
        <div style={{ marginTop: "24px", padding: "16px", background: "#f9fafb", borderRadius: "8px" }}>
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
            <strong>Didn't receive the email?</strong>
          </p>
          <ul style={{ fontSize: "12px", color: "#6b7280", textAlign: "left", paddingLeft: "20px" }}>
            <li>Check your spam/junk folder</li>
            <li>Make sure you entered the correct email address</li>
            <li>Wait a few minutes for the email to arrive</li>
            <li>Click "Resend Verification Email" if needed</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
