import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    trueAuth: (state) => {
      state.value = true;
    },
    falseAuth: (state) => {
      state.value = false;
    },
  },
});

export const { trueAuth, falseAuth } = authSlice.actions
export default authSlice.reducer;
