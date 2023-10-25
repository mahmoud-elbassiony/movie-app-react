import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Movie } from "../movie-item/Movie";
import { Filter } from "../filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../features/watch-List/watchListSlice";

export const Movies = ({ movies, isLoading, error }) => {
  const moviesState = useSelector((state) => state.watchList.movies);
  // const dispatch = useDispatch();

  // movies && dispatch(setMovies(movies));

  // useEffect(() => {
  //   console.log("statte", moviesState);
  //   if (moviesState?.length === 0) {
  //     console.log("new set");
  //     movies && dispatch(setMovies(movies));
  //   }
  //   console.log("statte Af", moviesState);
  // }, [movies]);

  let moviesList = moviesState?.map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ));

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 text-white">
        <h4 className="">Latest movies</h4>
        <Filter movies={movies} />
      </div>
      <h2>{isLoading}</h2>
      {isLoading && <p>loading .... </p>}
      {moviesList && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-4 gy-5 text-white">
          {moviesList}
        </div>
      )}
    </div>
  );
};
