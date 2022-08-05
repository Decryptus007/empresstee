import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import loadingReducer from "../features/loadingSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    loadingState: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
