import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./movie-details.css";
import Snakbar from "../snackbar/Snackbar";

export const MovieDetails = () => {
  const { id, media } = useParams();

  const {
    data: movieDetails,
    isLoading,
    error,
  } = useFetch(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=14bdd69ce887376edfafb09f23f78fe9`
  );

  return (
    <div>
      {isLoading && <p>loading ...</p>}
      {error && <p>{error.message}</p>}
      {movieDetails && (
        <div>
          <div className="movie-details position-relative ">
            <img
              src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}`}
              alt=""
            />
            <div className="poster-img">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                alt=""
              />
            </div>
            <div className="movie-content text-white d-flex flex-column  ">
              <div className="d-flex justify-content-between align-items-center">
                <h2>{movieDetails.title ?? movieDetails.name}</h2>
                <div
                  className="watchlist-icon ms-auto"
                  style={{ cursor: "pointer", width: "2.25rem" }}
                >
                  <Snakbar movie={movieDetails} />
                </div>
              </div>
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
              <p className="fs-6">
                Release Date:{" "}
                {movieDetails.release_date ?? movieDetails.last_air_date}
              </p>
              <div className="mt-3 d-flex align-items-center">
                <div
                  className="d-flex align-items-baseline pe-3"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  <p className=" fw-bold fs-3 me-1 mb-0">
                    {movieDetails.vote_average?.toFixed(1)}
                  </p>
                  <span style={{ fontSize: " 12px", fontWeight: "500" }}>
                    IMDb
                  </span>
                </div>
                <div className="ps-3">
                  <p className="mb-0">Status</p>
                  <p className="fw-bold mb-1">{movieDetails.status}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container  " style={{ marginTop: "10%" }}>
            <p className="overview text-white">{movieDetails.overview}</p>
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     <div className="movie-details position-relative ">
  //       <img
  //         src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}`}
  //         alt=""
  //       />
  //       <div className="container position-absolute">
  //         <div className="d-flex gap-5 align-items-start">
  //           <div className="poster-img">
  //             <img
  //               src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
  //               alt=""
  //             />
  //           </div>
  //           <div className="text-white d-flex flex-column movie-content ">
  //             <div className="d-flex justify-content-between align-items-center">
  //               {" "}
  //               <h2>{movieDetails.title ?? movieDetails.name}</h2>
  //               <div
  //                 className="ms-auto"
  //                 style={{ cursor: "pointer", width: "40px" }}
  //                 onClick={() => toggleWatchList(movieDetails)}
  //               >
  //                 {!isInWatchList && <img src={watchListAddIcon} alt="" />}
  //                 {isInWatchList && <img src={WatchListAddedIcon} alt="" />}
  //                 {/* {!isInWatchList && <FavoriteBorderOutlinedIcon />}
  //                 {isInWatchList && <FavoriteOutlinedIcon />} */}
  //               </div>
  //             </div>

  //             {/* <p className="overview">{movieDetails.overview}</p> */}
  //             <div className="d-flex gap-2 my-3">
  //               {movieDetails?.genres?.map((gen) => (
  //                 <p className="rounded-pill border px-3 py-1">{gen.name}</p>
  //               ))}
  //             </div>
  //             <p>
  //               Release Date:{" "}
  //               {movieDetails.release_date ?? movieDetails.last_air_date}
  //             </p>
  //             <p className="mt-1">Duration: {movieDetails.runtime}m</p>

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
  //       </div>
  //     </div>
  //     <div className="container text-white my-5">
  //       {" "}
  //       <p className="overview">{movieDetails.overview}</p>
  //     </div>
  //   </div>
  // );
};
