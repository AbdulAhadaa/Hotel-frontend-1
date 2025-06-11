import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import roomService from "../../services/roomService"
import toast from "react-hot-toast"

// Async thunks for room operations
export const createRoom = createAsyncThunk("rooms/createRoom", async (roomData, { rejectWithValue }) => {
  try {
    const response = await roomService.createRoom(roomData)
    toast.success("Room created successfully!")
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to create room"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const getAllRooms = createAsyncThunk("rooms/getAllRooms", async (filters = {}, { rejectWithValue }) => {
  try {
    const response = await roomService.getAllRooms(filters)
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch rooms"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const getRoomById = createAsyncThunk("rooms/getRoomById", async (roomId, { rejectWithValue }) => {
  try {
    const response = await roomService.getRoomById(roomId)
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to fetch room details"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const updateRoom = createAsyncThunk("rooms/updateRoom", async ({ roomId, roomData }, { rejectWithValue }) => {
  try {
    const response = await roomService.updateRoom(roomId, roomData)
    toast.success("Room updated successfully!")
    return response
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to update room"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (roomId, { rejectWithValue }) => {
  try {
    await roomService.deleteRoom(roomId)
    toast.success("Room deleted successfully!")
    return roomId
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to delete room"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const uploadRoomImages = createAsyncThunk(
  "rooms/uploadRoomImages",
  async ({ roomId, imageFiles }, { rejectWithValue }) => {
    try {
      const response = await roomService.uploadRoomImages(roomId, imageFiles)
      toast.success("Images uploaded successfully!")
      return response
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to upload images"
      toast.error(message)
      return rejectWithValue(message)
    }
  },
)

const initialState = {
  rooms: [],
  currentRoom: null,
  isLoading: false,
  error: null,
  success: false,
}

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    clearRoomError: (state) => {
      state.error = null
    },
    clearRoomSuccess: (state) => {
      state.success = false
    },
    clearCurrentRoom: (state) => {
      state.currentRoom = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Room
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false
        state.rooms.push(action.payload)
        state.success = true
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.success = false
      })
      // Get All Rooms
      .addCase(getAllRooms.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.isLoading = false
        state.rooms = action.payload
      })
      .addCase(getAllRooms.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get Room By ID
      .addCase(getRoomById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getRoomById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentRoom = action.payload
      })
      .addCase(getRoomById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Room
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.success = false
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isLoading = false
        state.rooms = state.rooms.map((room) => (room.id === action.payload.id ? action.payload : room))
        state.currentRoom = action.payload
        state.success = true
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.success = false
      })
      // Delete Room
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false
        state.rooms = state.rooms.filter((room) => room.id !== action.payload)
        state.success = true
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Upload Room Images
      .addCase(uploadRoomImages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(uploadRoomImages.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.currentRoom) {
          state.currentRoom = {
            ...state.currentRoom,
            images: [...(state.currentRoom.images || []), ...action.payload.images],
          }
        }
      })
      .addCase(uploadRoomImages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearRoomError, clearRoomSuccess, clearCurrentRoom } = roomSlice.actions
export default roomSlice.reducer
