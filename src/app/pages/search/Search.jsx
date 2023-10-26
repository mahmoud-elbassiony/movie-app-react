import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Movie } from "../../components/movie-item/Movie";
import { SearchForm } from "../../components/search-form/SearchForm";
import { Filter } from "../../components/filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../features/watch-List/watchListSlice";

export const Search = () => {
  const { input } = useParams();

  const { data, isLoading, error } = useFetch(
    `https://api.themoviedb.org/3/search/multi?api_key=14bdd69ce887376edfafb09f23f78fe9&query=${input}`
  );

  const searchResults = data.results;
  const moviesState = useSelector((state) => state.watchList.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    searchResults && dispatch(setMovies(searchResults));
  }, [searchResults]);

  const searchResultsList = moviesState?.map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ));

  return (
    <div className="container py-5 text-white">
      <div className="d-flex justify-content-between mb-3">
        {/* <SearchForm /> */}
        <h4>searchResults</h4>
        <Filter movies={searchResults} />
      </div>

      {isLoading && <p>loading ...</p>}
      {error && <p>{error.message}</p>}
      {searchResultsList.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-4 gy-5 text-white">
          {searchResultsList}
        </div>
      ) : (
        <div>
          <p className="text-white">No results</p>
        </div>
      )}
    </div>
  );
};
