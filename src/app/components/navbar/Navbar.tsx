import React, { ChangeEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assests/logo.svg";
import icon1 from "../../../assests/watch-list-add-0.svg";
import icon2 from "../../../assests/watch-list-add.svg";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { StoreState } from "../../../store";

import TemporaryDrawer from "../drawer/Drawer";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [input, setInput] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const watchListItemsCount = useSelector(
    (state: StoreState) => state.watchList.value.length
  );

  return (
    <nav className="navbar">
      <div className="container py-2 d-flex  align-items-center justify-content-between ">
        <div style={{ maxWidth: "160px" }} className="d-none d-sm-block">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="search d-flex align-items-center w-50 flex-grow-1 flex-sm-grow-0 flex-row-reverse flex-sm-row ">
          <input
            type="search"
            placeholder="Search movies, tv shows and more ..."
            className="search-input flex-grow-1  d-md-flex bg-transparent "
            value={input}
            onChange={handleInput}
          />
          <div className="search-icon">
            <Link to={`/search/${input}`}>
              <SearchIcon />
            </Link>
          </div>
        </div>
        <ul className="d-lg-flex gap-2 p-0 d-none">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/watchlist"}
              className={({ isActive }) =>
                isActive
                  ? "active d-flex align-items-center gap-2"
                  : "d-flex align-items-center gap-2"
              }
            >
              {" "}
              <span className="icon-watch-list-add fs-5"></span>
              Watchlist
              {watchListItemsCount > 0 && (
                <span className="counter">{watchListItemsCount}</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/login"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
          </li>
        </ul>
        <div className="d-lg-none gap-2 p-0 d-block text-white">
          <TemporaryDrawer />
        </div>
      </div>
    </nav>
  );
};
