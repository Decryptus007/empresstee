import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const showRoomSlice = createSlice({
  name: "showRoomSlice",
  initialState,
  reducers: {
    showRoom: (state) => {
      state.value = true;
    },
    unsetShowRoom: (state) => {
      state.value = false;
    },
  },
});

export const { showRoom, unsetShowRoom } = showRoomSlice.actions
export default showRoomSlice.reducer;
