import { configureStore } from "@reduxjs/toolkit";
import watchListReducer from "./app/features/watch-List/watchListSlice";
import { WatchListState } from "./app/features/watch-List/watchListSlice";
import mediaSliceReducer, {
  MediaStateType,
} from "./app/features/media/mediaSlice";
import paginationSliceReducer, {
  paginationStateType,
} from "./app/features/pagination/paginationSlice";

export type StoreState = {
  watchList: WatchListState;
  media: MediaStateType;
  pagination: paginationStateType;
};

export const store = configureStore({
  reducer: {
    watchList: watchListReducer,
    media: mediaSliceReducer,
    pagination: paginationSliceReducer,
  },
});
