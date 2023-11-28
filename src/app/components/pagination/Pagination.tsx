import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./pagination.css";

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
  };

  return (
    <Stack>
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
