import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    loading: (state) => {
      state.value = true;
    },
    notLoading: (state) => {
      state.value = false;
    },
  },
});

export const { loading, notLoading } = loadingSlice.actions
export default loadingSlice.reducer;
