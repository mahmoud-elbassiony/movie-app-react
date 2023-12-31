import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assests/logo-01.png";
import "./navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { SearchForm } from "../search-form/SearchForm";
import { NavbarLinks } from "../navbar-links/NavbarLinks";

export type SearchElmentType = React.RefObject<HTMLInputElement>;

type NavbarProps = {
  searchEl: SearchElmentType;
};

export const Navbar = ({ searchEl }: NavbarProps) => {
  const dropdownMenue = useRef<HTMLUListElement>(null);
  const menuIcon = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const currentEL: HTMLElement = event.target as HTMLElement;

      if (
        menuIcon.current &&
        !menuIcon.current.contains(currentEL) &&
        dropdownMenue.current?.classList.contains("show")
      ) {
        dropdownMenue.current?.classList.remove("show");
      } else if (menuIcon.current && menuIcon.current.contains(currentEL)) {
        dropdownMenue.current?.classList.toggle("show");
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="py-2 d-flex align-items-center justify-content-between gap-3 w-100">
          <div style={{ maxWidth: "160px" }} className="d-none d-sm-block">
            <Link to={"/"}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <SearchForm searchEl={searchEl} />
          <NavbarLinks className="d-lg-flex gap-2 p-0 d-none" />
          <div className="d-lg-none gap-2 p-0 d-flex text-white">
            <div style={{ zIndex: "3" }} ref={menuIcon}>
              <MenuIcon sx={{ cursor: "pointer" }} />
            </div>
            <NavbarLinks
              className="dropdown-menu position-absolute start-0 top-0 w-100 d-flex flex-column gap-2 py-5"
              style={{
                transform: "translateY(-100%)",
                transition: "all 0.35s ease-in-out",
                backgroundColor: "rgb(22,22,22)",
                zIndex: "2",
                border: "none",
                borderRadius: "0",
              }}
              reference={dropdownMenue}
            />

            {/* <ul
              className="position-absolute start-0 top-0 w-100 d-flex flex-column gap-2 py-5"
              style={{
                transform: "translateY(-100%)",
                transition: "all 0.35s ease-in-out",
                backgroundColor: "#000",
              }}
              ref={dropdownMenue}
            >
              <li>
                <NavLink to={"/"} className="text-center">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/watchlist"}
                  className="d-flex align-items-center gap-2 justify-content-center"
                >
                  <span className="icon-watch-list-add fs-5"></span>
                  Watchlist
                  {watchListItemsCount > 0 && (
                    <span className="counter">{watchListItemsCount}</span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to={"/login"} className="text-center">
                  Login
                </NavLink>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
// import { useRef } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import logo from "../../../assests/logo.svg";
// import "./navbar.css";
// import SearchIcon from "@mui/icons-material/Search";
// import { StoreState } from "../../../store";
// import TemporaryDrawer from "../drawer/Drawer";
// import { useDispatch, useSelector } from "react-redux";
// import { setMedia } from "../../features/media/mediaSlice";

// export const Navbar = () => {
//   // const [input, setInput] = useState("");
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const dispatch = useDispatch();
//   // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
//   //   setInput(e.target.value);
//   //   dispatch(setMedia("all"));
//   // };
//   const navigate = useNavigate();
//   const watchListItemsCount = useSelector(
//     (state: StoreState) => state.watchList.value.length
//   );

//   return (
//     <nav className="navbar">
//       <div className="container py-2 d-flex  align-items-center justify-content-between ">
//         <div style={{ maxWidth: "160px" }} className="d-none d-sm-block">
//           <Link to={"/"}>
//             <img src={logo} alt="" />
//           </Link>
//         </div>
//         <div className="search d-flex align-items-center w-50 flex-grow-1 flex-sm-grow-0 flex-row-reverse flex-sm-row ">
//           <input
//             type="search"
//             placeholder="Search movies, tv shows and more ..."
//             className="search-input flex-grow-1  d-md-flex bg-transparent "
//             ref={searchInputRef}
//             // onChange={handleInput}
//           />
//           <div className="search-icon">
//             <button
//               className="btn p-0"
//               onClick={() => {
//                 navigate(`/search/${searchInputRef.current?.value}`);
//                 dispatch(setMedia("all"));
//               }}
//             >
//               <SearchIcon />
//             </button>
//             {/* <Link to={`/search/${input}`}>
//               <SearchIcon />
//             </Link> */}
//           </div>
//         </div>
//         <ul className="d-lg-flex gap-2 p-0 d-none">
//           <li>
//             <NavLink
//               to={"/"}
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to={"/watchlist"}
//               className={({ isActive }) =>
//                 isActive
//                   ? "active d-flex align-items-center gap-2"
//                   : "d-flex align-items-center gap-2"
//               }
//             >
//               {" "}
//               <span className="icon-watch-list-add fs-5"></span>
//               Watchlist
//               {watchListItemsCount > 0 && (
//                 <span className="counter">{watchListItemsCount}</span>
//               )}
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to={"/login"}
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               Login
//             </NavLink>
//           </li>
//         </ul>
//         <div className="d-lg-none gap-2 p-0 d-block text-white">
//           <TemporaryDrawer />
//         </div>
//       </div>
//     </nav>
//   );
// };
