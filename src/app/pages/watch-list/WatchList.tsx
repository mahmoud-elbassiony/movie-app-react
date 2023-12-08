import React from "react";
import { useSelector } from "react-redux";
import { WatchListItem } from "../../components/watchlistItem/WatchListItem";
import { StoreState } from "../../../store";
import { MovieDetailsType } from "../../types/MovieDetails";
import { MovieType } from "../../types/Movie";
import { Link } from "react-router-dom";

export default function WatchList() {
  const watchListState = useSelector(
    (state: StoreState) => state.watchList.value
  );

  const watchListItems = watchListState?.map(
    (mov: MovieDetailsType | MovieType) => (
      <WatchListItem movie={mov} key={mov.id} />
    )
  );
  return (
    <div className="container my-5 text-white">
      {watchListState.length ? (
        <div className="row row-cols-1 row-cols-lg-2  g-5">
          {watchListItems}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="mb-3">Your watchlist is empty</h3>
          <Link to={"/"} className="btn main-btn-lg rounded-pill">
            Browse trending
          </Link>
        </div>
      )}
    </div>
  );
}
