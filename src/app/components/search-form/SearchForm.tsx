import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./search-form.css";
import { useDispatch } from "react-redux";
import { setMedia } from "../../features/moviesList/moviesListSlice";
import SearchIcon from "@mui/icons-material/Search";
import { SearchElmentType } from "../navbar/Navbar";

type SearchFormProps = {
  searchEl: SearchElmentType;
};

export const SearchForm = ({ searchEl }: SearchFormProps) => {
  // const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setMedia("all"));
    navigate(`/search/${searchEl.current?.value}`);
  }

  return (
    <form
      className="search d-flex align-items-center flex-grow-1 flex-row-reverse flex-sm-row"
      style={{ maxWidth: "550px" }}
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="Search movies, tv shows and more ..."
        className="search-input flex-grow-1 d-md-flex bg-transparent"
        ref={searchEl}
      />
      <div className="search-icon">
        <button className="btn p-0">
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};
