import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMedia } from "../../features/media/mediaSlice";
import { StoreState } from "../../../store";

type FilterPropsType = {
  updateCurrPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Filter = ({ updateCurrPage }: FilterPropsType) => {
  const mediaType = useSelector((state: StoreState) => state.media.mediaType);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMedia(event.target.value));
    updateCurrPage(1);
  };

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      style={{ width: "fit-content", cursor: "pointer" }}
      onChange={handleChange}
      defaultValue={mediaType}
    >
      <option value="movie">movie</option>
      <option value="tv">tv</option>
      <option value="all">all</option>
    </select>
  );
};
