import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./pagination.css";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store";
import { useFetch } from "../../hooks/useFetch";
import { setMovies } from "../../features/watch-List/watchListSlice";
import { useDispatch } from "react-redux";

type PaginationProps = {
  currPage: number;
  updateCurrPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

export const PaginationCom = ({
  currPage,
  updateCurrPage,
  totalPages,
}: PaginationProps) => {
  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    updateCurrPage(value);
    window.scrollTo({
      top: 650,
      left: 0,
      behavior: "smooth",
    });
    console.log("vall", value);
  };

  return (
    <Stack spacing={3}>
      <Pagination
        count={totalPages}
        page={currPage}
        variant="outlined"
        shape="rounded"
        onChange={handlePaginationChange}
      />
    </Stack>
  );
};
