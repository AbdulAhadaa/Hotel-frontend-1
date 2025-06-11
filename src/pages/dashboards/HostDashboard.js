"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllRooms, deleteRoom } from "../../store/slices/roomSlice"
import { getUserBookings } from "../../store/slices/bookingSlice"
import { Plus, Home, Calendar, DollarSign, Edit, Trash2, Eye, MapPin, Star, Users } from "lucide-react"

const HostDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { rooms, isLoading: roomsLoading } = useSelector((state) => state.rooms)
  const { bookings, isLoading: bookingsLoading } = useSelector((state) => state.bookings)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [roomToDelete, setRoomToDelete] = useState(null)

  useEffect(() => {
    // Fetch host's rooms and bookings
    dispatch(getAllRooms())
    dispatch(getUserBookings())
  }, [dispatch])

  const handleCreateProperty = () => {
    navigate("/rooms/create")
  }

  const handleEditRoom = (roomId) => {
    navigate(`/rooms/${roomId}/edit`)
  }

  const handleViewRoom = (roomId) => {
    navigate(`/rooms/${roomId}`)
  }

  const handleDeleteRoom = (room) => {
    setRoomToDelete(room)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (roomToDelete) {
      await dispatch(deleteRoom(roomToDelete.id))
      setShowDeleteModal(false)
      setRoomToDelete(null)
      // Refresh rooms list
      dispatch(getAllRooms())
    }
  }

  // Calculate stats
  const totalProperties = rooms?.length || 0
  const totalBookings = bookings?.length || 0
  const totalRevenue = bookings?.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0) || 0
  const averageRating = rooms?.reduce((sum, room) => sum + (room.rating || 0), 0) / totalProperties || 0

  const recentBookings = bookings?.slice(0, 5) || []

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || "Host"}!</h1>
          <p className="text-gray-600">Manage your properties and track your earnings</p>
        </div>
        <button
          onClick={handleCreateProperty}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Home className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <DollarSign className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Star className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      {recentBookings.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Guest</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Property</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Dates</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <Users size={16} className="text-gray-600" />
                        </div>
                        <span className="font-medium">{booking.guestName || "Guest"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{booking.room?.title || "Property"}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {booking.checkInDate} - {booking.checkOutDate}
                    </td>
                    <td className="py-3 px-4 font-medium">${booking.totalPrice}</td>
                    <td className="py-3 px-4">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Properties Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Properties</h2>
          <button
            onClick={handleCreateProperty}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>

        {roomsLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : rooms?.length === 0 ? (
          <div className="text-center py-12">
            <Home size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
            <p className="text-gray-600 mb-4">Start earning by listing your first property</p>
            <button
              onClick={handleCreateProperty}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  {room.images?.[0] ? (
                    <img
                      src={room.images[0] || "/placeholder.svg"}
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <Home size={24} className="text-gray-500" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleViewRoom(room.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      title="View Property"
                    >
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleEditRoom(room.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      title="Edit Property"
                    >
                      <Edit size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      title="Delete Property"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{room.title}</h3>
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
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span>{room.rating || "New"}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Capacity: {room.capacity || "N/A"} guests</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          room.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Property</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{roomToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HostDashboard
