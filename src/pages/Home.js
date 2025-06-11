import { Link } from "react-router-dom"
import { Search, MapPin, Star, Users } from "lucide-react"

const Home = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "white", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin style={{ color: "#2563eb" }} size={24} />
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1f2937" }}>Roomoree</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link
                to="/auth/login"
                style={{
                  color: "#6b7280",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
              >
                Sign In
              </Link>
              <Link to="/auth/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%)",
          padding: "80px 0",
        }}
      >
        <div className="container text-center">
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "24px",
            }}
          >
            Find Your Perfect Stay
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#6b7280",
              marginBottom: "32px",
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            Discover unique accommodations around the world. From cozy apartments to luxury villas, find the perfect
            place for your next adventure.
          </p>

          {/* Search Bar */}
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              background: "white",
              borderRadius: "50px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0 16px",
              }}
            >
              <Search style={{ color: "#9ca3af" }} size={20} />
              <input
                type="text"
                placeholder="Where are you going?"
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  outline: "none",
                  color: "#374151",
                  fontSize: "16px",
                }}
              />
            </div>
            <button className="btn btn-primary" style={{ borderRadius: "50px", padding: "12px 32px" }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="text-center mb-16">
            <h2
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              Why Choose Roomoree?
            </h2>
            <p
              style={{
                color: "#6b7280",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              We make it easy to find and book the perfect accommodation for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                style={{
                  background: "#dbeafe",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Search style={{ color: "#2563eb" }} size={24} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Easy Search</h3>
              <p style={{ color: "#6b7280" }}>
                Find exactly what you're looking for with our advanced search and filtering options
              </p>
            </div>

            <div className="text-center">
              <div
                style={{
                  background: "#dcfce7",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Star style={{ color: "#16a34a" }} size={24} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Verified Reviews</h3>
              <p style={{ color: "#6b7280" }}>Read authentic reviews from real guests to make informed decisions</p>
            </div>

            <div className="text-center">
              <div
                style={{
                  background: "#e9d5ff",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Users style={{ color: "#9333ea" }} size={24} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>Trusted Community</h3>
              <p style={{ color: "#6b7280" }}>Join millions of travelers and hosts in our trusted community</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "#111827",
          color: "white",
          padding: "80px 0",
        }}
      >
        <div className="container text-center">
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Ready to Start Your Journey?
          </h2>
          <p
            style={{
              color: "#d1d5db",
              marginBottom: "32px",
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            Join thousands of travelers who have found their perfect stays with Roomoree
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/auth/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/auth/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#f9fafb", padding: "48px 0" }}>
        <div className="container">
          <div className="text-center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <MapPin style={{ color: "#2563eb" }} size={24} />
              <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1f2937" }}>Roomoree</span>
            </div>
            <p style={{ color: "#6b7280" }}>© 2024 Roomoree. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
