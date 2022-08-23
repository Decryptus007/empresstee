import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    auth: null,
    userData: "",
  },
};

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    trueAuth: (state) => {
      state.value = { ...state.value, auth: true };
    },
    falseAuth: (state) => {
      state.value = { ...state.value, auth: false };
    },
    setUserData: (state, actions) => {
      state.value = { ...state.value, userData: actions.payload };
    },
  },
});

export const { trueAuth, falseAuth, setUserData } = authSlice.actions;
export default authSlice.reducer;
