import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import bookingService from "../../services/bookingService"
import toast from "react-hot-toast"

// Async thunks for booking operations
export const createBooking = createAsyncThunk("bookings/createBooking", async (bookingData, { rejectWithValue }) => {
  try {
    const response = await bookingService.createBooking(bookingData)
    toast.success("Booking created successfully!")
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to create booking"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const getBookingById = createAsyncThunk("bookings/getBookingById", async (bookingId, { rejectWithValue }) => {
  try {
    const response = await bookingService.getBookingById(bookingId)
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch booking details"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const getUserBookings = createAsyncThunk("bookings/getUserBookings", async (_, { rejectWithValue }) => {
  try {
    const response = await bookingService.getUserBookings()
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch bookings"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const response = await bookingService.updateBookingStatus(bookingId, status)
      toast.success(`Booking ${status} successfully!`)
      return response
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to update booking status"
      toast.error(message)
      return rejectWithValue(message)
    }
  },
)

export const cancelBooking = createAsyncThunk("bookings/cancelBooking", async (bookingId, { rejectWithValue }) => {
  try {
    await bookingService.cancelBooking(bookingId)
    toast.success("Booking cancelled successfully!")
    return bookingId
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to cancel booking"
    toast.error(message)
    return rejectWithValue(message)
  }
})

const initialState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
  success: false,
}

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null
    },
    clearBookingSuccess: (state) => {
      state.success = false
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookings.push(action.payload)
        state.currentBooking = action.payload
        state.success = true
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.success = false
      })
      // Get Booking By ID
      .addCase(getBookingById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getBookingById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentBooking = action.payload
      })
      .addCase(getBookingById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get User Bookings
      .addCase(getUserBookings.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookings = action.payload
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookings = state.bookings.map((booking) => (booking.id === action.payload.id ? action.payload : booking))
        state.currentBooking = action.payload
        state.success = true
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.success = false
      })
      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.isLoading = false
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload)
        state.currentBooking = null
        state.success = true
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.success = false
      })
  },
})

export const { clearBookingError, clearBookingSuccess, clearCurrentBooking } = bookingSlice.actions
export default bookingSlice.reducer
