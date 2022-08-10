import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import loadingReducer from "../features/loadingSlice";
import showRoomReducer from "../features/showRoomSlice"
import betterViewReducer from "../features/betterViewSlice"

export const store = configureStore({
  reducer: {
    authState: authReducer,
    loadingState: loadingReducer,
    showRoomState: showRoomReducer,
    betterViewProp: betterViewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
