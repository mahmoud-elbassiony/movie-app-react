import { useDispatch, useSelector } from "react-redux";
import { setMedia } from "../../features/moviesList/moviesListSlice";
import { StoreState } from "../../../store";

// type FilterPropsType = {
//   updateCurrPage: React.Dispatch<React.SetStateAction<number>>;
// };

export const Filter = () => {
  const mediaType = useSelector(
    (state: StoreState) => state.moviesList.mediaType
  );
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMedia(event.target.value));
  };

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      style={{ width: "fit-content", cursor: "pointer", zIndex: "1" }}
      onChange={handleChange}
      defaultValue={mediaType}
    >
      <option value="movie">movie</option>
      <option value="tv">tv</option>
      <option value="all">all</option>
    </select>
  );
};
