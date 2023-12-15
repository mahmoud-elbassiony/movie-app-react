import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedUserRoutes() {
  if (localStorage.getItem("token")) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
}
