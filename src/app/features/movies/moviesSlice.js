import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies-list",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
