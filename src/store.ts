import { configureStore } from "@reduxjs/toolkit";
import watchListReducer from "./app/features/watch-List/watchListSlice";
import { WatchListState } from "./app/features/watch-List/watchListSlice";
import moviesListSliceReducer, {
  moviesListStateType,
} from "./app/features/moviesList/moviesListSlice";

export type StoreState = {
  watchList: WatchListState;
  moviesList: moviesListStateType;
};

export const store = configureStore({
  reducer: {
    watchList: watchListReducer,
    moviesList: moviesListSliceReducer,
  },
});
