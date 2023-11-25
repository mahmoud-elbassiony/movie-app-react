import { createSlice } from "@reduxjs/toolkit";

export type paginationStateType = {
  currentPage: number;
  totalPages: number;
};

const initialState = {
  currentPage: 1,
  totalPages: 300,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state: paginationStateType, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state: paginationStateType, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPages } = paginationSlice.actions;

export default paginationSlice.reducer;
