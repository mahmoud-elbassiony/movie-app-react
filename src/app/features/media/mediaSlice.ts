import { createSlice } from "@reduxjs/toolkit";

export type MediaStateType = {
  mediaType: string;
};

const initialState = {
  mediaType: "all",
};

const mediaSlice = createSlice({
  name: "media-type",
  initialState,
  reducers: {
    setMedia: (state: MediaStateType, action) => {
      state.mediaType = action.payload;
    },
  },
});

export const { setMedia } = mediaSlice.actions;

export default mediaSlice.reducer;
