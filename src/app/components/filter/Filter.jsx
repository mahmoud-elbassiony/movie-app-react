import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../features/watch-List/watchListSlice";

export const Filter = ({ movies }) => {
  const [mediaType, setMediaType] = useState("");
  const handleChange = (event) => {
    setMediaType(event.target.value);

    // console.log("event", event.target.value);

    // if (event.target.value === "all") {
    //   dispatch(setMovies(movies));
    // } else {
    //   console.log(movies);
    //   let filterd = movies?.filter((movie) => movie.media_type === mediaType);
    //   console.log(filterd);
    //   dispatch(setMovies(filterd));
    // }
  };

  //   const moviesState = useSelector((state) => state.watchList.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mediaType === "all") {
      dispatch(setMovies(movies));
    } else {
      // console.log(movies);
      let filterd = movies?.filter((movie) => movie.media_type === mediaType);
      // console.log("fil", filterd);
      filterd && dispatch(setMovies(filterd));
    }
  }, [mediaType]);

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      style={{ width: "fit-content" }}
      onChange={handleChange}
    >
      <option selected> Media Type</option>
      <option value="movie">movie</option>
      <option value="tv">tv</option>
      <option value="all">all</option>
    </select>

    // <Box sx={{ minWidth: 120 }}>
    //   <FormControl fullWidth>
    //     <InputLabel
    //       id="demo-simple-select-label"
    //       sx={{
    //         color: " #22b9d5",
    //       }}
    //     >
    //       Media Type
    //     </InputLabel>
    //     <Select
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       value={mediaType}
    //       label="Media Type"
    //       onChange={handleChange}
    //       sx={{
    //         backgroundColor: "white",
    //         color: "black",
    //         // border: "1px solid white",
    //       }}
    //     >
    //       <MenuItem value="movie">movie</MenuItem>
    //       <MenuItem value="tv">tv</MenuItem>
    //       <MenuItem value="all">all</MenuItem>
    //     </Select>
    //   </FormControl>
    // </Box>
  );
};
