import Header from "../common/Header"

const MainLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Header />
      <main className="main-content">{children}</main>
    </div>
  )
}

export default MainLayout
