import React, { useEffect } from "react";
import { Movies } from "../../components/movies/Movies";
import { HeroSection } from "../../components/hero-section/HeroSection";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setMovies } from "../../features/watch-List/watchListSlice";
import { MovieType } from "../../types/Movie";

export const Home = () => {
  const { data, isLoading, error } = useFetch(
    "https://api.themoviedb.org/3/trending/all/day?api_key=14bdd69ce887376edfafb09f23f78fe9"
  );
  const movies: MovieType[] = data?.results;

  const dispatch = useDispatch();

  useEffect(() => {
    movies && dispatch(setMovies(movies));
  }, [movies, dispatch]);

  return (
    <div>
      <HeroSection />
      <Movies movies={movies} isLoading={isLoading} error={error} />
    </div>
  );
};
