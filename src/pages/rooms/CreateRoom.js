"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createRoom, clearRoomError, clearRoomSuccess } from "../../store/slices/roomSlice"
import { ArrowLeft, Upload, X, MapPin, DollarSign, Users, Home } from "lucide-react"

const CreateRoom = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, success } = useSelector((state) => state.rooms)
  const [selectedImages, setSelectedImages] = useState([])
  const [imagePreview, setImagePreview] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    dispatch(clearRoomError())
    dispatch(clearRoomSuccess())
  }, [dispatch])

  useEffect(() => {
    if (success) {
      // Redirect to dashboard after successful creation
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    }
  }, [success, navigate])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setSelectedImages(files)

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreview(previews)
  }

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    const newPreviews = imagePreview.filter((_, i) => i !== index)
    setSelectedImages(newImages)
    setImagePreview(newPreviews)
  }

  const onSubmit = async (data) => {
    const roomData = {
      ...data,
      pricePerNight: Number.parseFloat(data.pricePerNight),
   
      isAvailable: true,
    }

    await dispatch(createRoom(roomData))
  }

  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate("/dashboard")} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Property</h1>
          <p className="text-gray-600">Add a new property to start earning</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">Property created successfully! Redirecting to dashboard...</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Home size={20} />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
              <input
                type="text"
                placeholder="Beautiful downtown apartment"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("title", { required: "Property title is required" })}
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                placeholder="Describe your property, its features, and what makes it special..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Location
              </label>
              <input
                type="text"
                placeholder="City, State, Country"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
            </div>

            <div>
             
              {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>}
            </div>
          </div>
        </div>

        {/* Pricing & Capacity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign size={20} />
            Pricing & Capacity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per Night ($)</label>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="100.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                {...register("pricePerNight", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be at least $1" },
                })}
              />
              {errors.pricePerNight && <p className="text-red-600 text-sm mt-1">{errors.pricePerNight.message}</p>}
            </div>

      


          </div>
        </div>

       
      

        {/* Images */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Upload size={20} />
            Property Images
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Upload photos of your property</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload size={16} />
              Choose Images
            </label>
          </div>

          {imagePreview.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Image Preview</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating...
              </>
            ) : (
              "Create Property"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateRoom
