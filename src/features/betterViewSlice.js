import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    cakeProps: '',
    loadingProps: true,
  },
};

export const betterViewSlice = createSlice({
  name: "betterViewSlice",
  initialState,
  reducers: {
    betterViewStore: (state, actions) => {
      state.value = {...state.value, cakeProps: actions.payload}
    },
    loadingCakes: (state, actions) => {
      state.value = {...state.value, loadingProps: actions.payload}
    },
  }
});

export const { betterViewStore, loadingCakes } = betterViewSlice.actions
export default betterViewSlice.reducer;
