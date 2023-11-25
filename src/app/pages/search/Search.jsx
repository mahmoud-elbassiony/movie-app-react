import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Movie } from "../../components/movie-item/Movie";
import { SearchForm } from "../../components/search-form/SearchForm";
import { Filter } from "../../components/filter/Filter";
import { useSelector } from "react-redux";
import { PaginationCom } from "../../components/pagination/Pagination";

export const Search = () => {
  const { input } = useParams();
  const [currPage, setCurrPage] = useState(1);
  const { data, isLoading, error } = useFetch(
    `https://api.themoviedb.org/3/search/multi?api_key=14bdd69ce887376edfafb09f23f78fe9&query=${input}&page=${currPage}`
  );

  const searchResults = data?.results;
  const totalPages = data?.total_pages;
  const moviesState = useSelector((state) => state.watchList.movies);

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
      {error ? (
        <p>{error.message}</p>
      ) : searchResultsList.length > 0 ? (
        <div className="d-flex flex-column align-items-center gap-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-4 gy-5 text-white">
            {searchResultsList}
          </div>
          <PaginationCom updateCurrPage={setCurrPage} totalPages={totalPages} />
        </div>
      ) : (
        <div>
          <p className="text-white">No results</p>
        </div>
      )}
    </div>
  );
};
