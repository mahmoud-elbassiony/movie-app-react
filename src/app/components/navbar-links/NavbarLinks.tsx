import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { StoreState } from "../../../store";

type NavbarLinksProps = {
  style?: Object;
  className?: string;
  reference?: any;
};

export function NavbarLinks({
  style = {},
  className = "",
  reference = null,
}: NavbarLinksProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const watchListItemsCount = useSelector(
    (state: StoreState) => state.watchList.value.length
  );

  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <ul className={className} style={style} ref={reference}>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink
          to={localStorage.getItem("token") ? "/watchlist" : "/login"}
          className={({ isActive, isPending }) =>
            location.pathname === "/watchlist"
              ? "active d-flex align-items-center gap-2"
              : "d-flex align-items-center gap-2"
          }
          end
        >
          <span className="icon-watch-list-add fs-5"></span>
          Watchlist
          {watchListItemsCount > 0 && (
            <span className="counter">{watchListItemsCount}</span>
          )}
        </NavLink>
      </li>
      <li>
        {!localStorage.getItem("token") ? (
          <NavLink to={"/login"} className="main-btn rounded-2">
            Login
          </NavLink>
        ) : (
          <button className="log-out btn text-white" onClick={handleLogOut}>
            Log out
          </button>
        )}
      </li>
    </ul>
  );
}
