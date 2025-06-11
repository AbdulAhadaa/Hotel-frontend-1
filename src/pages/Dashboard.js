"use client"

import { useSelector } from "react-redux"
import GuestDashboard from "./dashboards/GuestDashboard"
import HostDashboard from "./dashboards/HostDashboard"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  // Render different dashboard based on user role
  if (user?.role === "host") {
    return <HostDashboard />
  }

  return <GuestDashboard />
}

export default Dashboard
