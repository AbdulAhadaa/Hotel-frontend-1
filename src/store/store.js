import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import roomReducer from "./slices/roomSlice"
import bookingReducer from "./slices/bookingSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
    bookings: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export default store
