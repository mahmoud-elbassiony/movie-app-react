import { PulseSpinner } from "react-spinners-kit";

export function Loader() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <PulseSpinner size={30} color="#1795ac" loading={true} />
    </div>
  );
}
