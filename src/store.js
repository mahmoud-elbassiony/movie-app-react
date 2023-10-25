import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./app/features/movies/moviesSlice";
import watchListReducer from "./app/features/watch-List/watchListSlice";

export const store = configureStore({
  reducer: {
    watchList: watchListReducer,
  },
});
