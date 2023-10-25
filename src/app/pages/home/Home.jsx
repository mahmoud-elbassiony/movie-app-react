import React, { useEffect, useState } from "react";
import { Movies } from "../../components/movies/Movies";
import { HeroSection } from "../../components/hero-section/HeroSection";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../features/watch-List/watchListSlice";

export const Home = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=14bdd69ce887376edfafb09f23f78fe9"
  );
  const movies = data.results;

  const moviesState = useSelector((state) => state.watchList.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    movies && dispatch(setMovies(movies));
  }, [movies]);

  // const [NewMovis, setNewMovies] = useState([]);

  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   setMovies(
  //     data.results?.map((object) => {
  //       const propertyDescriptor = {
  //         configurable: true,
  //         writable: true,
  //         enumerable: true,
  //         value: false,
  //       };

  //       Object.defineProperty(object, "isInWatchList", propertyDescriptor);

  //       return object;
  //     })
  //   );
  // }, [data]);

  return (
    <div>
      <HeroSection />
      <Movies movies={movies} isLoading={isLoading} error={error} />
    </div>
  );
};
