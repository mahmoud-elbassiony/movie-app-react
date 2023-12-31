import { Movie } from "../movie-item/Movie";
import { Filter } from "../filter/Filter";
import { useSelector } from "react-redux";
import { MovieType } from "../../types/Movie";
import { StoreState } from "../../../store";
import { PaginationCom } from "../pagination/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";

export const Movies = () => {
  const { mediaType, currentPage } = useSelector(
    (state: StoreState) => state.moviesList
  );

  const { data, isLoading, error } = useFetch(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=14bdd69ce887376edfafb09f23f78fe9&page=${currentPage}`
  );

  const movies: MovieType[] = data?.results;
  const totalPages = data?.total_pages > 300 ? 300 : data?.total_pages;
  const tempArr = Array.from({ length: 20 });
  let moviesList;

  if (movies) {
    moviesList = movies?.map((movie: MovieType) => (
      <Movie key={movie.id} movie={movie} isLoading={isLoading} />
    ));
  } else {
    moviesList = tempArr.map((_, i) => (
      <Movie movie={{} as MovieType} key={i} isLoading={isLoading} />
    ));
  }

  return (
    <div className="container py-5 text-white">
      {error && <h3>{error.message}</h3>}
      {!error && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4 px-3">
            <h4 className="">
              {mediaType === "all"
                ? "Trending"
                : mediaType === "movie"
                ? "Trending Movies"
                : "Trending TV Shows"}
            </h4>
            <Filter />
          </div>
          <div className="text-white d-flex flex-column align-items-center gap-5 ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 gx-4 gy-5 w-100">
              {moviesList}
            </div>
            {<PaginationCom totalPages={totalPages} scrollTo={650} />}
          </div>
        </>
      )}

      {/* <div className="text-white d-flex flex-column align-items-center gap-5 ">
        {isLoading ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 gx-4 gy-5 ">
            {Array(20)
              .fill(0)
              .map((item, index) => (
                <Stack spacing={1} key={index}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      backgroundColor: "#eee",
                    }}
                  >
                    <img src={temp} alt="" />
                  </Skeleton>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", backgroundColor: "#fff" }}
                  />
                </Stack>
              ))}
          </div>
        ) : (
          moviesList && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 gx-4 gy-5 ">
              {moviesList}
            </div>
          )
        )}
        <PaginationCom
          updateCurrPage={setCurrPage}
          currPage={currPage}
          totalPages={totalPages}
        />
      </div> */}

      {/* {isLoading ? (
        <p className="text-center">loading .... </p>
      ) : (
        moviesList && (
          <div className="text-white d-flex flex-column align-items-center gap-5 ">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 gx-4 gy-5 ">
              {moviesList}
            </div>
            <PaginationCom
              updateCurrPage={setCurrPage}
              currPage={currPage}
              totalPages={totalPages}
            />
          </div>
        )
      )} */}
    </div>
  );
};
