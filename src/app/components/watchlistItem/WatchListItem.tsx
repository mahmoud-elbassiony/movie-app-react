import React, { useEffect, useState } from "react";
import defaultPosterImage from "../../../assests/default-poster.jpg";
import "./watch-list.css";
import watchListAddIcon from "../../../assests/watch-list-add.svg";
import WatchListAddedIcon from "../../../assests/watch-list-added.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../features/watch-List/watchListSlice";
import { MovieType } from "../../types/Movie";
import { MovieDetailsType } from "../../types/MovieDetails";
import { StoreState } from "../../../store";

type WatchListItemProps = {
  movie: MovieDetailsType | MovieType;
};

export const WatchListItem = ({ movie }: WatchListItemProps) => {
  const dispatch = useDispatch();
  const [isInWatchList, setIsInWatchList] = useState(false);
  const watchListState = useSelector(
    (state: StoreState) => state.watchList.value
  );

  const toggleWatchList = (movie: MovieType | MovieDetailsType) => {
    dispatch(toggle(movie));
    let index = watchListState.findIndex((mov) => mov.id === movie.id);
    if (index !== -1) {
      setIsInWatchList(false);
    } else {
      setIsInWatchList(true);
    }
  };

  useEffect(() => {
    let index = watchListState.findIndex((mov) => mov.id === movie.id);
    if (index !== -1) {
      setIsInWatchList(true);
    }
  }, [movie, watchListState]);

  return (
    <div className="col ">
      <div className="d-flex row flex-column-reverse flex-sm-row g-4">
        <div className="col-12 col-sm-4">
          <img
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultPosterImage
            }
            alt=""
          />
        </div>
        <div className="col-12 col-sm-8 ">
          <div className="d-flex justify-content-between align-items-start">
            <h3>{movie?.title ?? movie?.name ?? "No Title Found"}</h3>
            <div
              className="watchlist-icon-container ms-2"
              style={{ cursor: "pointer", maxWidth: "20px" }}
              onClick={() => toggleWatchList(movie)}
            >
              {!isInWatchList && <img src={watchListAddIcon} alt="" />}
              {isInWatchList && <img src={WatchListAddedIcon} alt="" />}
            </div>
          </div>

          <p className="four-two-lines">{movie.overview}</p>
          <div className="d-flex align-items-baseline pe-3">
            {movie.vote_count > 0 ? (
              <>
                <p className=" fw-bold fs-3 me-1 mb-0">
                  {movie?.vote_average?.toFixed(1)}
                </p>
                <span style={{ fontSize: " 12px", fontWeight: "500" }}>
                  IMDb
                </span>
              </>
            ) : (
              <p className=" fw-bold fs-5 me-1 mb-0">Not rated yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// return (
//   <div className="col ">
//     {watchListState?.length && (
//       <div className="text-white">No items in wa</div>
//     )}
//     {watchListState?.length && (
//       <div className="d-flex row">
//         <div className="col-4">
//           <img
//             src={
//               poster_path
//                 ? `https://image.tmdb.org/t/p/w500/${poster_path}`
//                 : defaultPosterImage
//             }
//             alt=""
//           />
//         </div>
//         <div className="col-8">
//           <div className="d-flex justify-content-between align-items-center">
//             <h3>{title ?? name}</h3>
//             <div
//               className="ms-2"
//               style={{ cursor: "pointer", maxWidth: "30px" }}
//               onClick={() => toggleWatchList(movie)}
//             >
//               {!isInWatchList && <img src={watchListAddIcon} alt="" />}
//               {isInWatchList && <img src={WatchListAddedIcon} alt="" />}
//             </div>
//           </div>

//           <p className="four-two-lines">{overview}</p>
//           <div className="d-flex align-items-baseline pe-3">
//             <p className=" fw-bold fs-3 me-1 mb-0">
//               {vote_average?.toFixed(1)}
//             </p>
//             <span style={{ fontSize: " 12px", fontWeight: "500" }}>IMDb</span>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// );
