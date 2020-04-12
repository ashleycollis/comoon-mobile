import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.loggedIn = payload;
    },
  },
});

export const { login } = authSlide.actions;
export default authSlide.reducer;
