import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./movie-details.css";
import Snakbar from "../../components/snackbar/Snackbar";
import { MovieDetailsType } from "../../types/MovieDetails";
import { useEffect, useState } from "react";
import defaultPosterImage from "../../../assests/default-poster.jpg";
import defaultCoverImage from "../../../assests/default-cover.png";

export default function MovieDetails() {
  const { id, media } = useParams();

  const { data, isLoading, error } = useFetch(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=14bdd69ce887376edfafb09f23f78fe9`
  );

  const [coverLoading, setCoverLoading] = useState(true);
  const [posterLoading, setPosterLoading] = useState(true);

  const movieDetails = data as MovieDetailsType;

  console.log(movieDetails);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="text-white ">
      {error && (
        <div className="container">
          <h3 className="mt-5">{error.message}</h3>
        </div>
      )}

      {!error && (
        <div>
          <div className={"movie-details position-relative"}>
            <div
              className={isLoading || coverLoading ? "loading-img" : ""}
              style={{ aspectRatio: " 12/5" }}
            >
              {!isLoading && (
                <img
                  onLoad={() => setCoverLoading(false)}
                  src={
                    movieDetails?.backdrop_path
                      ? `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails?.backdrop_path}`
                      : defaultCoverImage
                  }
                  alt=""
                />
              )}
            </div>

            <div
              className="movie-details-container position-absolute d-flex justify-content-between"
              style={{
                bottom: "-10%",
                left: "10%",
                width: "80%",
                zIndex: "2",
              }}
            >
              <div
                className={
                  isLoading || posterLoading
                    ? "poster-img loading-img loading-img-border"
                    : "poster-img"
                }
                style={{ aspectRatio: "2/3", minHeight: "100%" }}
              >
                {!isLoading && (
                  <img
                    onLoad={() => setPosterLoading(false)}
                    src={
                      movieDetails?.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`
                        : defaultPosterImage
                    }
                    alt=""
                  />
                )}
              </div>
              <div className="movie-content text-white d-flex flex-column ">
                {!isLoading ? (
                  <div className="d-flex justify-content-between">
                    <h2>
                      {movieDetails?.title ??
                        movieDetails?.name ??
                        "No Title Found"}
                    </h2>
                    <div
                      className="watchlist-icon ms-2"
                      style={{ cursor: "pointer", width: "1.75rem" }}
                    >
                      <Snakbar movie={movieDetails} />
                    </div>
                  </div>
                ) : (
                  <span className="loading-p loading-light w-50 mb-3"></span>
                )}

                {!isLoading ? (
                  <div className=" d-flex gap-2 my-1 flex-wrap ">
                    {movieDetails?.genres?.map(
                      (gen: { id: number; name: string }) => (
                        <p
                          key={gen.id}
                          className=" gategory rounded-pill border-none border-sm"
                        >
                          {gen.name}
                        </p>
                      )
                    )}
                  </div>
                ) : (
                  <span className="loading-p loading-light w-50 my-2"></span>
                )}
                {!isLoading ? (
                  <p className="fs-6">
                    {movieDetails?.release_date &&
                      "Release date: " + movieDetails?.release_date}
                    {movieDetails?.last_air_date &&
                      "Last air date:" + movieDetails?.last_air_date}
                  </p>
                ) : (
                  <span className="loading-p loading-light w-50"></span>
                )}

                {!isLoading ? (
                  <div className="mt-3 d-flex align-items-center">
                    <div
                      className="d-flex align-items-baseline pe-3"
                      style={{ borderRight: "1px solid #ddd" }}
                    >
                      {movieDetails?.vote_count > 0 ? (
                        <>
                          <p className=" fw-bold fs-3 me-1 mb-0">
                            {movieDetails?.vote_average?.toFixed(1)}
                          </p>
                          <span
                            style={{ fontSize: " 12px", fontWeight: "500" }}
                          >
                            IMDb
                          </span>{" "}
                        </>
                      ) : (
                        <p>Not Rated</p>
                      )}
                    </div>

                    <div className="ps-3">
                      <>
                        <p className="mb-0">Status</p>
                        <p className="fw-bold mb-1">
                          {movieDetails?.status || "Unknown"}
                        </p>
                      </>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 d-flex align-items-center w-50">
                    <div
                      className="pe-3  w-50 h-100 d-flex align-items-center"
                      style={{ borderRight: "1px solid #ddd" }}
                    >
                      <span className="loading-p loading-light w-100 mb-0"></span>
                    </div>

                    <div className="w-50 ps-3">
                      <span className="loading-p loading-light"></span>
                      <span className="loading-p loading-light mb-0"></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="container overview mb-5 text-white"
            style={{ marginTop: "10%" }}
          >
            {!isLoading ? (
              <p>{movieDetails?.overview || "No Discription Avaliable"}</p>
            ) : (
              <>
                <span className="loading-p loading-dark"></span>
                <span className="loading-p loading-dark"></span>
                <span className="loading-p loading-dark"></span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     {isLoading && <p>loading ...</p>}
  //     {error && <p>{error.message}</p>}
  //     {movieDetails && (
  //       <div>
  //         <div className="movie-details position-relative ">
  //           <img
  //             src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}`}
  //             alt=""
  //           />
  //           <div className="poster-img">
  //             <img
  //               src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
  //               alt=""
  //             />
  //           </div>
  //           <div className="movie-content text-white d-flex flex-column  ">
  //             <div className="d-flex justify-content-between align-items-center">
  //               <h2>{movieDetails.title ?? movieDetails.name}</h2>
  //               <div
  //                 className="watchlist-icon ms-auto"
  //                 style={{ cursor: "pointer", width: "2.25rem" }}
  //               >
  //                 <Snakbar movie={movieDetails} />
  //               </div>
  //             </div>
  //             <div className=" d-flex gap-2 my-1 flex-wrap ">
  //               {movieDetails?.genres?.map(
  //                 (gen: { id: number; name: string }) => (
  //                   <p
  //                     key={gen.id}
  //                     className=" gategory rounded-pill border-none border-sm"
  //                   >
  //                     {gen.name}
  //                   </p>
  //                 )
  //               )}
  //             </div>
  //             <p className="fs-6">
  //               Release Date:{" "}
  //               {movieDetails.release_date ?? movieDetails.last_air_date}
  //             </p>
  //             <div className="mt-3 d-flex align-items-center">
  //               <div
  //                 className="d-flex align-items-baseline pe-3"
  //                 style={{ borderRight: "1px solid #ddd" }}
  //               >
  //                 <p className=" fw-bold fs-3 me-1 mb-0">
  //                   {movieDetails.vote_average?.toFixed(1)}
  //                 </p>
  //                 <span style={{ fontSize: " 12px", fontWeight: "500" }}>
  //                   IMDb
  //                 </span>
  //               </div>
  //               <div className="ps-3">
  //                 <p className="mb-0">Status</p>
  //                 <p className="fw-bold mb-1">{movieDetails.status}</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="container  " style={{ marginTop: "10%" }}>
  //           <p className="overview text-white">{movieDetails.overview}</p>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
}
