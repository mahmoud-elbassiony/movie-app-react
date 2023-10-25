import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  movies: [],
};

const watchListSlice = createSlice({
  name: "watch-list",
  initialState,
  reducers: {
    toggle: (state, action) => {
      let index = state.value.findIndex((mov) => mov.id === action.payload.id);

      if (index === -1) {
        state.value = [...state.value, action.payload];

        // state.movies = state.movies.map((mov) => {
        //   if (mov.id === action.payload.id) {
        //     return { ...mov, isInWatchList: true };
        //   }
        //   return mov;
        // });

        // console.log("mov stat add", state.movies);
        // console.log("mov stat ad", state.movies);
        // const newPayload = Object.assign({}, action.payload, {
        //   isInWatchList: true,
        // });
        // action.payload = newPayload;

        // action.payload.isInWatchList = true;
      } else {
        state.value = state.value.filter((mov) => mov.id !== action.payload.id);

        // state.movies = state.movies.map((mov) => {
        //   if (mov.id === action.payload.id) {
        //     return { ...mov, isInWatchList: false };
        //   }
        //   return mov;
        // });

        // console.log("mov stat re", state.movies);
        // const newPayload = Object.assign({}, action.payload, {
        //   isInWatchList: false,
        // });

        // action.payload = newPayload;

        // action.payload.isInWatchList = false;
      }
    },
    setMovies: (state, action) => {
      state.movies = [...action.payload];
    },
  },
});

export const { toggle, setMovies } = watchListSlice.actions;

export default watchListSlice.reducer;
