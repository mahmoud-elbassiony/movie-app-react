import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Movie } from "../../components/movie-item/Movie";
import { Filter } from "../../components/filter/Filter";
import { useSelector } from "react-redux";
import { PaginationCom } from "../../components/pagination/Pagination";
import { StoreState } from "../../../store";
import { MovieType } from "../../types/Movie";
import { useEffect } from "react";
import { SearchElmentType } from "../../components/navbar/Navbar";

type SearchProps = {
  searchEl: SearchElmentType;
};

export default function Search({ searchEl }: SearchProps) {
  const { input } = useParams();
  const { mediaType, currentPage } = useSelector(
    (state: StoreState) => state.moviesList
  );
  const { data, isLoading, error } = useFetch(
    `https://api.themoviedb.org/3/search/${
      mediaType === "all" ? "multi" : mediaType
    }?api_key=14bdd69ce887376edfafb09f23f78fe9&query=${input}&page=${currentPage}`
  );

  const searchResults = data?.results;
  const totalPages = data?.total_pages > 300 ? 300 : data?.total_pages;

  const searchResultsList = searchResults?.map((movie: MovieType) => (
    <Movie key={movie.id} movie={movie} isLoading={isLoading} />
  ));

  useEffect(() => {
    if (searchEl.current && input && searchEl.current?.value !== input) {
      searchEl.current.value = input;
    }
  }, [searchEl, input]);

  return (
    <div className="container py-5 text-white">
      {error && <h3>{error.message}</h3>}
      {!error && (
        <>
          {searchResultsList?.length > 0 ? (
            <>
              <div className="d-flex justify-content-between mb-3">
                <h4>searchResults</h4>
                <Filter />
              </div>
              <div className="d-flex flex-column align-items-center gap-5">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-4 gy-5 text-white w-100">
                  {searchResultsList}
                </div>
                {!isLoading && (
                  <PaginationCom totalPages={totalPages} scrollTo={0} />
                )}
              </div>
            </>
          ) : (
            !isLoading && (
              <div>
                <h3 className="text-white">No results</h3>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
