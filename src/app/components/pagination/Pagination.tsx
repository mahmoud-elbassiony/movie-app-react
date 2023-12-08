import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { setCurrentPage } from "../../features/moviesList/moviesListSlice";
import "./pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../../store";

type PaginationProps = {
  totalPages: number;
  scrollTo?: number;
};

export const PaginationCom = ({
  totalPages,
  scrollTo = 0,
}: PaginationProps) => {
  const currentPage = useSelector(
    (state: StoreState) => state.moviesList.currentPage
  );
  const dispatch = useDispatch();

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setCurrentPage(value));
    window.scrollTo({
      top: scrollTo,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Stack>
      <Pagination
        count={totalPages}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        onChange={handlePaginationChange}
      />
    </Stack>
  );
};
