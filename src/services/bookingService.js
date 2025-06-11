import api from "./api"

const bookingService = {
  // Create a new booking - POST /bookings
  createBooking: async (bookingData) => {
    const response = await api.post("/bookings", bookingData)
    return response.data
  },

  // Get booking details - GET /bookings/:id
  getBookingById: async (bookingId) => {
    const response = await api.get(`/bookings/${bookingId}`)
    return response.data
  },

  // Get all bookings for current user - GET /bookings
  getUserBookings: async () => {
    const response = await api.get("/bookings")
    return response.data
  },

  // Update booking status - PUT /bookings/:id
  updateBookingStatus: async (bookingId, status) => {
    const response = await api.put(`/bookings/${bookingId}`, { status })
    return response.data
  },

  // Cancel booking - DELETE /bookings/:id
  cancelBooking: async (bookingId) => {
    const response = await api.delete(`/bookings/${bookingId}`)
    return response.data
  },
}

export default bookingService
