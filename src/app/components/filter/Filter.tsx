import { useMoviesContext } from "../../contexts/MoviesContext";

export const Filter = () => {
  const { mediaType, onMediaChange } = useMoviesContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onMediaChange(event.target.value);
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
