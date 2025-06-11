"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { getRoomById } from "../../store/slices/roomSlice"
import { ArrowLeft, MapPin, Star, Users, Bed, Bath, Square, Wifi, Car, Utensils, Calendar } from "lucide-react"

const RoomDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentRoom: room, isLoading } = useSelector((state) => state.rooms)
  const { user } = useSelector((state) => state.auth)

  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    if (id) {
      dispatch(getRoomById(id))
    }
  }, [dispatch, id])

  const handleBookNow = () => {
    if (!user) {
      navigate("/auth/login")
      return
    }
    navigate(`/rooms/${id}/book`, {
      state: { checkIn, checkOut, guests },
    })
  }

  const amenityIcons = {
    WiFi: Wifi,
    Parking: Car,
    Kitchen: Utensils,
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{room.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="font-medium">{room.rating || "4.5"}</span>
              <span className="text-gray-600">({room.reviewCount || "12"} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin size={16} />
              <span>{room.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
              {room.images && room.images.length > 0 ? (
                <img
                  src={room.images[selectedImage] || "/placeholder.svg"}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <MapPin size={48} className="text-gray-500" />
                </div>
              )}
            </div>

            {room.images && room.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {room.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${room.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-gray-600" />
                <span className="text-gray-900">{room.capacity} guests</span>
              </div>
              {room.bedrooms && (
                <div className="flex items-center gap-2">
                  <Bed size={20} className="text-gray-600" />
                  <span className="text-gray-900">{room.bedrooms} bedrooms</span>
                </div>
              )}
              {room.bathrooms && (
                <div className="flex items-center gap-2">
                  <Bath size={20} className="text-gray-600" />
                  <span className="text-gray-900">{room.bathrooms} bathrooms</span>
                </div>
              )}
              {room.squareFeet && (
                <div className="flex items-center gap-2">
                  <Square size={20} className="text-gray-600" />
                  <span className="text-gray-900">{room.squareFeet} sq ft</span>
                </div>
              )}
            </div>
            <p className="text-gray-700 leading-relaxed">{room.description}</p>
          </div>

          {/* Amenities */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Wifi
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <IconComponent size={20} className="text-gray-600" />
                      <span className="text-gray-900">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">${room.pricePerNight}</span>
                <span className="text-gray-600">/ night</span>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: room.capacity }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} guest{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Breakdown */}
            {checkIn && checkOut && (
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      ${room.pricePerNight} x{" "}
                      {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} nights
                    </span>
                    <span>
                      $
                      {(
                        room.pricePerNight * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$25.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        room.pricePerNight *
                          Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) +
                        25
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleBookNow}
              disabled={!checkIn || !checkOut}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              {user ? "Book Now" : "Sign in to Book"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail
