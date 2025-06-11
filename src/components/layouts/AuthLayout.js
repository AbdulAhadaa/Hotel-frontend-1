import { Outlet } from "react-router-dom"
import { Home, Users, Star } from "lucide-react"

const AuthLayout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Left side - Branding */}
      <div
        style={{
          display: "none",
          width: "50%",
          background: "linear-gradient(135deg, #2563eb 0%, #9333ea 50%, #1e40af 100%)",
          position: "relative",
          overflow: "hidden",
        }}
        className="lg:flex lg:flex-col lg:justify-center lg:items-center lg:text-white lg:p-12"
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.1)" }}
        ></div>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "16px", color: "white" }}>Roomoree</h1>
          <p style={{ fontSize: "20px", opacity: 0.9, marginBottom: "32px", color: "white" }}>
            Your perfect stay is just a click away
          </p>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "24px",
            maxWidth: "400px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "12px",
                borderRadius: "50%",
              }}
            >
              <Home size={24} color="white" />
            </div>
            <div>
              <h3 style={{ fontWeight: "600", color: "white" }}>Unique Stays</h3>
              <p style={{ fontSize: "14px", opacity: 0.8, color: "white" }}>Discover amazing places to stay</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "12px",
                borderRadius: "50%",
              }}
            >
              <Users size={24} color="white" />
            </div>
            <div>
              <h3 style={{ fontWeight: "600", color: "white" }}>Trusted Community</h3>
              <p style={{ fontSize: "14px", opacity: 0.8, color: "white" }}>Join millions of travelers</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "12px",
                borderRadius: "50%",
              }}
            >
              <Star size={24} color="white" />
            </div>
            <div>
              <h3 style={{ fontWeight: "600", color: "white" }}>Best Experience</h3>
              <p style={{ fontSize: "14px", opacity: 0.8, color: "white" }}>Rated 4.8/5 by our users</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "80px",
            width: "128px",
            height: "128px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            width: "96px",
            height: "96px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "40px",
            width: "64px",
            height: "64px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      {/* Right side - Auth forms */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 16px",
          backgroundColor: "#f8fafc",
        }}
        className="lg:w-1/2"
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
