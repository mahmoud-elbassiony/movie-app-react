import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { toggle } from "../../features/watch-List/watchListSlice";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();
  const [isInWatchList, setIsInWatchList] = useState(false);
  const watchListState = useSelector((state) => state.watchList.value);

  useEffect(() => {
    let index = watchListState.findIndex((mov) => mov.id === movieDetails.id);
    if (index !== -1) {
      setIsInWatchList(true);
    }
  }, [movieDetails]);

  const toggleWatchList = (movie) => {
    dispatch(toggle(movie));
    let index = watchListState.findIndex((mov) => mov.id === movieDetails.id);
    if (index !== -1) {
      setIsInWatchList(false);
    } else {
      setIsInWatchList(true);
    }
  };

  return (
    <div>
      {movieDetails &&
        ((
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
                {" "}
                <h2>{movieDetails.title ?? movieDetails.name}</h2>
                <div
                  className="watchlist-icon ms-auto"
                  style={{ cursor: "pointer", width: "2.25rem" }}
                >
                  <Snakbar movie={movieDetails} />
                  {/* {!isInWatchList && <img src={watchListAddIcon} alt="" />}
                {isInWatchList && <img src={WatchListAddedIcon} alt="" />} */}
                </div>
              </div>{" "}
              <div className=" d-flex gap-2 my-1 flex-wrap ">
                {movieDetails?.genres?.map((gen) => (
                  <p
                    key={gen.id}
                    className=" gategory rounded-pill border-none border-sm"
                  >
                    {gen.name}
                  </p>
                ))}
              </div>
              <p>
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
            </div>{" "}
          </div>
        ),
        (
          <div className="container  " style={{ marginBottom: "10%" }}>
            <p className="overview text-white">{movieDetails.overview}</p>
          </div>
        ))}
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
  //
  // return (
  //   <div
  //     className="movie-details position-relative "
  //     // style={{
  //     //   backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}) `,
  //     // }}
  //   >
  //     <img
  //       src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}`}
  //       alt=""
  //     />
  //     <div className="container position-absolute">
  //       <div className="d-flex gap-5 align-items-center">
  //         <div className="">
  //           <img
  //             src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
  //             alt=""
  //           />
  //         </div>
  //         <div className="text-white d-flex flex-column">
  //           <h2>{movieDetails.title ?? movieDetails.name}</h2>
  //           <p>{movieDetails.overview}</p>
  //           <div className="d-flex ">
  //             {movieDetails?.genres?.map((gen) => (
  //               <p>{gen.name}</p>
  //             ))}
  //           </div>
  //           <p>{movieDetails.release_date ?? movieDetails.last_air_date}</p>
  //           <p>{movieDetails.runtime}</p>
  //           <div className="mt-auto d-flex">
  //             <div
  //               className="d-flex align-items-baseline pe-3"
  //               style={{ borderRight: "1px solid #ddd" }}
  //             >
  //               <p className=" fw-bold fs-3 me-1 mb-0">
  //                 {movieDetails.vote_average?.toFixed(1)}
  //               </p>
  //               <span style={{ fontSize: " 12px", fontWeight: "500" }}>
  //                 IMDb
  //               </span>
  //             </div>
  //             <div className="ps-3">
  //               <p className="mb-0">Status</p>
  //               <p className="fw-bold mb-1">{movieDetails.status}</p>
  //             </div>
  //             <div
  //               className="ms-auto"
  //               style={{ cursor: "pointer" }}
  //               onClick={() => toggleWatchList(movieDetails)}
  //             >
  //               {!isInWatchList && (
  //                 <FavoriteBorderOutlinedIcon fontSize="large" />
  //               )}
  //               {isInWatchList && <FavoriteOutlinedIcon fontSize="large" />}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};
