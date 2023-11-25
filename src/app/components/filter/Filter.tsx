import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../../features/watch-List/watchListSlice";
import { MovieType } from "../../types/Movie";

type FilterProps = {
  movies: MovieType[];
};

export const Filter = ({ movies }: FilterProps) => {
  const [mediaType, setMediaType] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMediaType(event.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let isSubscribed = true;
    console.log("movies", movies);

    if (isSubscribed) {
      if (movies) {
        if (mediaType === "all" || mediaType === "") {
          dispatch(setMovies(movies));
        } else {
          let filterd = movies?.filter(
            (movie) => movie.media_type === mediaType
          );
          filterd && dispatch(setMovies(filterd));
          console.log(filterd);
        }
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [mediaType, movies, dispatch]);

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      style={{ width: "fit-content", cursor: "pointer" }}
      onChange={handleChange}
      defaultValue="Media Type"
    >
      <option value=""> Media Type</option>
      <option value="movie">movie</option>
      <option value="tv">tv</option>
      <option value="all">all</option>
    </select>
  );
};
