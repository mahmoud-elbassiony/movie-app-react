import React from "react";
import { useSelector } from "react-redux";
import { WatchListItem } from "../../features/watch-List/WatchListItem";

export const WatchList = () => {
  const watchListState = useSelector((state) => state.watchList.value);
  console.log(watchListState);

  const watchListItems = watchListState?.map((mov) => (
    <WatchListItem movie={mov} key={mov.id} />
  ));
  return (
    <div className="container my-5 text-white">
      {watchListState.length ? (
        <div className="row row-cols-1 row-cols-lg-2  g-5">
          {watchListItems}
        </div>
      ) : (
        <div>
          <p>No movies in your watchlist</p>
        </div>
      )}
    </div>
  );
};
