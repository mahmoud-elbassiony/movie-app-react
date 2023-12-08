import { useNavigate } from "react-router-dom";
import defaultPosterImage from "../../../assests/default-poster.jpg";
import Snakbar from "../snackbar/Snackbar";
import { MovieType } from "../../types/Movie";
import "./movie.css";
import { useRef, useState } from "react";

type MovieProps = {
  movie: MovieType;
  isLoading: boolean;
};

export const Movie = ({ movie, isLoading }: MovieProps) => {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const navigte = useNavigate();

  const navigteToDetails = () => {
    navigte(`/${movie?.id}/${movie?.media_type}`);
  };

  return (
    <div className="col">
      <div className={"movie-card position-relative"}>
        <div
          className={isImgLoading || isLoading ? "loading-img" : ""}
          style={{ aspectRatio: "2/3" }}
        >
          {!isLoading && (
            <img
              loading="lazy"
              ref={imgRef}
              onLoad={() => setIsImgLoading(false)}
              className={"movie-card__img"}
              style={{
                cursor: "pointer",
                height: isImgLoading ? "0" : "auto",
              }}
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultPosterImage
              }
              alt=""
              onClick={navigteToDetails}
            />
          )}
        </div>

        {!isLoading && movie?.vote_count > 0 && (
          <div
            className="position-absolute top-0 end-0 text-white p-3 d-flex justify-content-center align-items-center"
            style={{
              width: "38px",
              height: "45px",
              fontWeight: "500",
              backgroundColor:
                movie?.vote_average &&
                parseFloat(movie?.vote_average.toFixed(1)) >= 7
                  ? "#108eb0"
                  : "#f7d34ff2",
            }}
          >
            {movie?.vote_average && parseFloat(movie?.vote_average.toFixed(1))}
          </div>
        )}
        {!isLoading && (
          <div
            className="position-absolute top-0 start-0"
            style={{ cursor: "pointer" }}
          >
            <Snakbar movie={movie} />
          </div>
        )}
      </div>

      <h6 className="mt-2 text-center mt-3 movie-title">
        {isLoading ? (
          <span className="loading-p loading-dark"></span>
        ) : (
          movie?.title ?? movie?.name ?? "No Title Found"
        )}
      </h6>
    </div>
  );
};
