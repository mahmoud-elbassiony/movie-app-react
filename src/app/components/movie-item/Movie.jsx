import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggle } from "../../features/watch-List/watchListSlice";
import defaultImage from "../../../assests/default-img.jpg";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import watchListAddIcon from "../../../assests/watch-list-add.svg";
import WatchListAddedIcon from "../../../assests/watch-list-added.svg";
import Snakbar from "../snackbar/Snackbar";

export const Movie = ({ movie }) => {
  const navigte = useNavigate();
  const [test, setTest] = useState(false);
  const watchListState = useSelector((state) => state.watchList.value);

  useEffect(() => {
    let index = watchListState.findIndex((mov) => mov.id === movie.id);
    if (index !== -1) {
      setTest(true);
    }
  }, [movie]);

  const {
    title,
    poster_path,
    name,
    id,
    media_type,
    vote_average,
    isInWatchList,
  } = movie;

  const navigteToDetails = () => {
    navigte(`/movie/${id}/${media_type}`);
  };

  const dispatch = useDispatch();

  const toggleWatchList = (movie) => {
    dispatch(toggle(movie));
    let index = watchListState.findIndex((mov) => mov.id === movie.id);
    if (index !== -1) {
      setTimeout(() => {
        setTest(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setTest(true);
      }, 2000);
    }
  };

  // const toggleWatchList = (movie) => {
  //   dispatch(toggle(movie));
  // };

  return (
    <div className="col">
      <div className="position-relative">
        <img
          style={{ cursor: "pointer" }}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImage
          }
          alt=""
          onClick={navigteToDetails}
        />
        <div
          className="position-absolute top-0 end-0 text-white p-3 d-flex justify-content-center align-items-center"
          style={{
            width: "38px",
            height: "45px",
            fontWeight: "500",
            backgroundColor:
              vote_average && parseFloat(vote_average.toFixed(1)) >= 7
                ? "#108eb0"
                : "#f7d34ff2",
          }}
        >
          {vote_average && parseFloat(vote_average.toFixed(1))}
        </div>
        <div
          className="position-absolute top-0 start-0"
          style={{ cursor: "pointer", width: "40px" }}
        >
          {/* {!isInWatchList && <FavoriteBorderOutlinedIcon fontSize="large" />} */}

          {/* {isInWatchList && <FavoriteOutlinedIcon fontSize="large" />} */}
          {/* {!test && <img src={watchListAddIcon} alt="" />} */}
          <Snakbar movie={movie} />
          {/* {test && <img src={WatchListAddedIcon} alt="" />} */}
          {/* {!isInWatchList && <img src={watchListAddIcon} alt="" />}
          {isInWatchList && <img src={WatchListAddedIcon} alt="" />} */}
        </div>
      </div>

      <h6 className="mt-2 text-center">{title ?? name}</h6>
    </div>
  );
};
