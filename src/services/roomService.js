import api from "./api"

const roomService = {
  // Create a new room - POST /rooms
  createRoom: async (roomData) => {
    const response = await api.post("/rooms", roomData)
    return response.data
  },

  // Get all rooms - GET /rooms
  getAllRooms: async (filters = {}) => {
    const queryParams = new URLSearchParams()

    // Add filters to query params if they exist
    if (filters.location) queryParams.append("location", filters.location)
    if (filters.minPrice) queryParams.append("minPrice", filters.minPrice)
    if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice)
    if (filters.capacity) queryParams.append("capacity", filters.capacity)
    if (filters.amenities) queryParams.append("amenities", filters.amenities.join(","))

    const url = `/rooms${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    const response = await api.get(url)
    return response.data
  },

  // Get room details - GET /rooms/:id
  getRoomById: async (roomId) => {
    const response = await api.get(`/rooms/${roomId}`)
    return response.data
  },

  // Update room - PUT /rooms/:id
  updateRoom: async (roomId, roomData) => {
    const response = await api.put(`/rooms/${roomId}`, roomData)
    return response.data
  },

  // Delete room - DELETE /rooms/:id
  deleteRoom: async (roomId) => {
    const response = await api.delete(`/rooms/${roomId}`)
    return response.data
  },

  // Upload room images - POST /rooms/:id/images
  uploadRoomImages: async (roomId, imageFiles) => {
    const formData = new FormData()

    // Append each image to form data
    imageFiles.forEach((file, index) => {
      formData.append(`images`, file)
    })

    const response = await api.post(`/rooms/${roomId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  },
}

export default roomService
