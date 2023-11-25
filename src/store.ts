import { configureStore } from "@reduxjs/toolkit";
import watchListReducer from "./app/features/watch-List/watchListSlice";
import { WatchListState } from "./app/features/watch-List/watchListSlice";

export type StoreState = {
  watchList: WatchListState;
};

export const store = configureStore({
  reducer: {
    watchList: watchListReducer,
  },
});
