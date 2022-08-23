import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    cakeProps: {},
    loadingProps: true,
    savedItemsProps: 0,
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
    savedItemsLength: (state, actions) => {
      state.value = {...state.value, savedItemsProps: actions.payload}
    },
  }
});

export const { betterViewStore, loadingCakes, savedItemsLength } = betterViewSlice.actions
export default betterViewSlice.reducer;
