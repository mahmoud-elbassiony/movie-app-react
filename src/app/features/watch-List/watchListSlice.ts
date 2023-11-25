import { createSlice } from "@reduxjs/toolkit";
import { MovieDetailsType } from "../../types/MovieDetails";
import { MovieType } from "../../types/Movie";

export type WatchListState = {
  value: MovieType[] | MovieDetailsType[];
  movies: MovieType[];
};

const initialState = {
  value: [],
  movies: [],
};

const watchListSlice = createSlice({
  name: "watch-list",
  initialState,
  reducers: {
    toggle: (state: WatchListState, action) => {
      let index = state.value.findIndex(
        (mov: MovieDetailsType | MovieType) => mov.id === action.payload.id
      );

      if (index === -1) {
        state.value = [...state.value, action.payload];
      } else {
        state.value.splice(index, 1);
        // state.value = state.value.filter((mov: MovieDetailsType | MovieType) => mov.id !== action.payload.id);
      }
    },
    setMovies: (state: WatchListState, action) => {
      state.movies = [...action.payload];
    },
  },
});

export const { toggle, setMovies } = watchListSlice.actions;

export default watchListSlice.reducer;
