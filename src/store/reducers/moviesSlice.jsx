import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};
export const moviesSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadmovies: (state, action) => {
      state.info = action.payload;
    },
    removemovies: (state, action) => {
      state.info = null;
    },
  },
});

export const { loadmovies, removemovies } = moviesSlice.actions;
export default moviesSlice.reducer;
