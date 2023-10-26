import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import watchListAddIcon from "../../../assests/watch-list-add.svg";
import WatchListAddedIcon from "../../../assests/watch-list-added.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../features/watch-List/watchListSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ movie }) {
  const dispatch = useDispatch();
  const [isInWatchList, setIsInWatchList] = React.useState(false);
  const watchListState = useSelector((state) => state.watchList.value);

  const [open, setOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

  const handleClick = (movie) => {
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {!isInWatchList && (
        <img
          src={watchListAddIcon}
          alt=""
          variant="outlined"
          onClick={() => handleClick(movie)}
        />
      )}
      {isInWatchList && (
        <img
          src={WatchListAddedIcon}
          alt=""
          variant="outlined"
          onClick={() => handleClick(movie)}
        />
      )}

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
}
