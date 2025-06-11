"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllRooms } from "../../store/slices/roomSlice"
import { getUserBookings } from "../../store/slices/bookingSlice"
import { Search, MapPin, Star, Calendar, Heart, Filter, Grid, List } from "lucide-react"

const GuestDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { rooms, isLoading: roomsLoading } = useSelector((state) => state.rooms)
  const { bookings, isLoading: bookingsLoading } = useSelector((state) => state.bookings)

  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    capacity: "",
  })
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Fetch rooms and user bookings on component mount
    dispatch(getAllRooms())
    dispatch(getUserBookings())
  }, [dispatch])

  const handleSearch = () => {
    const searchFilters = {
      ...filters,
      location: searchTerm || filters.location,
    }
    dispatch(getAllRooms(searchFilters))
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    dispatch(getAllRooms(filters))
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      capacity: "",
    })
    setSearchTerm("")
    dispatch(getAllRooms())
  }

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}`)
  }

  const handleBookRoom = (roomId) => {
    navigate(`/rooms/${roomId}/book`)
  }

  const recentBookings = bookings?.slice(0, 3) || []
  const filteredRooms =
    rooms?.filter(
      (room) =>
        room.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.location?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || "Guest"}!</h1>
        <p className="text-gray-600">Discover amazing places to stay for your next adventure</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={20} />
              Filters
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City or area"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="$0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="$1000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <select
                  value={filters.capacity}
                  onChange={(e) => handleFilterChange("capacity", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="6">6+ Guests</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Available Properties</p>
              <p className="text-2xl font-bold text-gray-900">{rooms?.length || 0}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Your Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings?.length || 0}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Saved Properties</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Heart className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                  {booking.room?.images?.[0] ? (
                    <img
                      src={booking.room.images[0] || "/placeholder.svg"}
                      alt={booking.room.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
                      <MapPin size={20} className="text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{booking.room?.title || "Property"}</h3>
                  <p className="text-sm text-gray-600">
                    {booking.checkInDate} - {booking.checkOutDate}
                  </p>
                  <p className="text-sm text-gray-600">${booking.totalPrice}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Properties Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Properties</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {roomsLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                  viewMode === "list" ? "flex" : ""
                }`}
                onClick={() => handleRoomClick(room.id)}
              >
                <div className={`${viewMode === "list" ? "w-48 h-32" : "h-48"} bg-gray-200 flex-shrink-0`}>
                  {room.images?.[0] ? (
                    <img
                      src={room.images[0] || "/placeholder.svg"}
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <MapPin size={24} className="text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{room.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span>{room.rating || "4.5"}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin size={14} />
                    {room.location}
                  </p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{room.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">${room.pricePerNight}</span>
                      <span className="text-sm text-gray-600"> / night</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBookRoom(room.id)
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GuestDashboard
