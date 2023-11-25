import { useState } from "react";
import { Movies } from "../../components/movies/Movies";
import { HeroSection } from "../../components/hero-section/HeroSection";
import { useFetch } from "../../hooks/useFetch";
import { MovieType } from "../../types/Movie";

export const Home = () => {
  const [currPage, setCurrPage] = useState(1);

  const { data, isLoading, error } = useFetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=14bdd69ce887376edfafb09f23f78fe9&page=${currPage}`
  );

  const movies: MovieType[] = data?.results;
  const totalPages = data?.total_pages > 300 ? 300 : data?.total_pages;

  return (
    <div>
      <HeroSection />
      <Movies
        movies={movies}
        isLoading={isLoading}
        error={error}
        currPage={currPage}
        updateCurrPage={setCurrPage}
        totalPages={totalPages}
      />
    </div>
  );
};
