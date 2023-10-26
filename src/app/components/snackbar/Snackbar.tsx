import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import watchListAddIcon from "../../../assests/watch-list-add.svg";
import WatchListAddedIcon from "../../../assests/watch-list-added.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../features/watch-List/watchListSlice";
import { MovieType } from "../../types/Movie";
import { MovieDetailsType } from "../../types/MovieDetails";
import { StoreState } from "../../../store";

type SnackbarProps = {
  movie: MovieType | MovieDetailsType;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ movie }: SnackbarProps) {
  const dispatch = useDispatch();
  const [isInWatchList, setIsInWatchList] = React.useState(false);
  const watchListState = useSelector(
    (state: StoreState) => state.watchList.value
  );

  const [open, setOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

  const handleClick = (movie: MovieType | MovieDetailsType) => {
    setOpen(true);
    dispatch(toggle(movie));
    let index = watchListState.findIndex((mov) => mov.id === movie.id);
    if (index !== -1) {
      setIsInWatchList(false);
      setAlertMsg("movie removed from watchlist");
    } else {
      setIsInWatchList(true);
      setAlertMsg("movie added to watchlist");
    }
  };

  React.useEffect(() => {
    let index = watchListState.findIndex((mov) => mov.id === movie.id);
    if (index !== -1) {
      setIsInWatchList(true);
    }
  }, [movie]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {!isInWatchList && (
        <img src={watchListAddIcon} alt="" onClick={() => handleClick(movie)} />
      )}
      {isInWatchList && (
        <img
          src={WatchListAddedIcon}
          alt=""
          onClick={() => handleClick(movie)}
        />
      )}

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
