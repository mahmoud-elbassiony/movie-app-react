import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./pagination.css";
import { useMoviesContext } from "../../contexts/MoviesContext";

type PaginationProps = {
  totalPages: number;
  scrollTo?: number;
};

export const PaginationCom = ({
  totalPages,
  scrollTo = 0,
}: PaginationProps) => {
  const { currentPage, onPageChange } = useMoviesContext();

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    onPageChange(value);
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
