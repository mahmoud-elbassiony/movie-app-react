import { createSlice } from "@reduxjs/toolkit";

export type moviesListStateType = {
  currentPage: number;
  totalPages: number;
  mediaType: string;
  search: string;
};

const initialState = {
  mediaType: "all",
  currentPage: 1,
  totalPages: 300,
  search: "",
};

const moviesListSlice = createSlice({
  name: "moviesList",
  initialState,
  reducers: {
    setCurrentPage: (state: moviesListStateType, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state: moviesListStateType, action) => {
      state.currentPage = action.payload;
    },
    setMedia: (state: moviesListStateType, action) => {
      return { ...state, currentPage: 1, mediaType: action.payload };
    },
    setSearch: (state: moviesListStateType, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPages, setMedia, setSearch } =
  moviesListSlice.actions;

export default moviesListSlice.reducer;
