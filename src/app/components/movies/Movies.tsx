import { Movie } from "../movie-item/Movie";
import { Filter } from "../filter/Filter";
import { useSelector } from "react-redux";
import { MovieType } from "../../types/Movie";
import { ErrorResponse } from "../../types/Error";
import { StoreState } from "../../../store";
import { PaginationCom } from "../pagination/Pagination";

type MovieProps = {
  movies: MovieType[];
  isLoading: boolean;
  error: ErrorResponse | null;
  currPage: number;
  updateCurrPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

export const Movies = ({
  movies,
  isLoading,
  error,
  currPage,
  updateCurrPage,
  totalPages,
}: MovieProps) => {
  const moviesState = useSelector(
    (state: StoreState) => state.watchList.movies
  );

  let moviesList = moviesState?.map((movie: MovieType) => (
    <Movie key={movie.id} movie={movie} />
  ));

  return (
    <div className="container py-5 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h4 className="">Latest movies</h4>
        <Filter movies={movies} />
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
              updateCurrPage={updateCurrPage}
              currPage={currPage}
              totalPages={totalPages}
            />
          </div>
        )
      )}
    </div>
  );
};
