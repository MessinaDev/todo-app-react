import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    alert: null,
  },
  reducers: {
    showAlert: (state, { payload }) => {
      state.alert = {
        text: payload.text,
        type: payload.type,
        duration: payload.duration,
      };
    },
    hideAlert: (state) => {
      state.alert = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
