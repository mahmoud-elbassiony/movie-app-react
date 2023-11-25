import { Movie } from "../movie-item/Movie";
import { Filter } from "../filter/Filter";
import { useSelector } from "react-redux";
import { MovieType } from "../../types/Movie";
import { StoreState } from "../../../store";
import { PaginationCom } from "../pagination/Pagination";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const Movies = () => {
  const [currPage, setCurrPage] = useState(1);
  const mediaType = useSelector((state: StoreState) => state.media.mediaType);
  const media = useSelector((state: StoreState) => state.media.mediaType);

  const { data, isLoading, error } = useFetch(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=14bdd69ce887376edfafb09f23f78fe9&page=${currPage}`
  );

  const movies: MovieType[] = data?.results;
  const totalPages = data?.total_pages > 300 ? 300 : data?.total_pages;

  let moviesList = movies?.map((movie: MovieType) => (
    <Movie key={movie.id} movie={movie} />
  ));

  console.log(movies);

  return (
    <div className="container py-5 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h4 className="">
          {media === "all"
            ? "Trending"
            : media === "movie"
            ? "Trending Movies"
            : "Trending TV Shows"}
        </h4>
        <Filter updateCurrPage={setCurrPage} />
      </div>
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <p className="text-center">loading .... </p>
      ) : (
        moviesList && (
          <div className="text-white d-flex flex-column align-items-center gap-5 ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gx-4 gy-5 ">
              {moviesList}
            </div>
            <PaginationCom
              updateCurrPage={setCurrPage}
              currPage={currPage}
              totalPages={totalPages}
            />
          </div>
        )
      )}
    </div>
  );
};
