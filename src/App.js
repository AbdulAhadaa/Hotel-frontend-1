"use client"

import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getCurrentUser } from "./store/slices/authSlice"
import AuthLayout from "./components/layouts/AuthLayout"
import MainLayout from "./components/layouts/MainLayout"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import VerifyEmail from "./pages/auth/VerifyEmail"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import CreateRoom from "./pages/rooms/CreateRoom"
import RoomDetail from "./pages/rooms/RoomDetail"
import TestIntegration from "./pages/TestIntegration"
import NetworkDiagnostics from "./pages/NetworkDiagnostics"
import CorsWorkarounds from "./pages/CorsWorkarounds"
import ConnectionStatus from "./components/common/ConnectionStatus"
import CorsWarning from "./components/common/CorsWarning"

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, token } = useSelector((state) => state.auth)

  useEffect(() => {
    document.title = process.env.REACT_APP_APP_NAME || "Roomoree"

    // Get current user data if token exists
    if (token && isAuthenticated) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, token, isAuthenticated])

  return (
    <div className="App">
      {/* CORS Warning Banner */}
      <CorsWarning />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* Diagnostic Routes */}
        <Route path="/test-integration" element={<TestIntegration />} />
        <Route path="/network-diagnostics" element={<NetworkDiagnostics />} />
        <Route path="/cors-workarounds" element={<CorsWorkarounds />} />

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />

        {/* Room Routes */}
        <Route
          path="/rooms/create"
          element={
            isAuthenticated ? (
              <MainLayout>
                <CreateRoom />
              </MainLayout>
            ) : (
              <Navigate to="/auth/login" />
            )
          }
        />

        <Route
          path="/rooms/:id"
          element={
            <MainLayout>
              <RoomDetail />
            </MainLayout>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Connection Status Indicator */}
      {process.env.REACT_APP_DEBUG === "true" && <ConnectionStatus />}
    </div>
  )
}

export default App
