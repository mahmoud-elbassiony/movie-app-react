import { useNavigate } from "react-router-dom";
import defaultImage from "../../../assests/default-img.jpg";
import Snakbar from "../snackbar/Snackbar";
import { MovieType } from "../../types/Movie";
import "./movie.css";
import React, { useEffect, useRef, useState } from "react";

type MovieProps = {
  movie: MovieType;
};

export const Movie = ({ movie }: MovieProps) => {
  const navigte = useNavigate();

  const { title, poster_path, name, id, media_type, vote_average } = movie;

  const navigteToDetails = () => {
    navigte(`/movie/${id}/${media_type}`);
  };
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  console.log(imgRef.current?.complete);

  return (
    <div className="col">
      <div className="movie-card position-relative">
        <img
          className="movie-card__img"
          style={{
            cursor: "pointer",
          }}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImage
          }
          alt=""
          onClick={navigteToDetails}
        />
        {/* <div
          style={{
            background: "red",
            height: "400px",
            width: "400px",
          }}
        >
          <img
            onLoad={() => setIsImgLoaded(true)}
            // ref={imgRef}
            loading="lazy"
            className="movie-card__img"
            style={{
              cursor: "pointer",
              display: isImgLoaded ? "block" : "none",
            }}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : defaultImage
            }
            alt=""
            onClick={navigteToDetails}
          />
        </div> */}
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
          style={{ cursor: "pointer" }}
        >
          <Snakbar movie={movie} />
        </div>
      </div>

      <h6 className="mt-2 text-center mt-3 movie-title">{title ?? name}</h6>
    </div>
  );
};
