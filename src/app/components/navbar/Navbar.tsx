import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assests/logo.svg";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import TemporaryDrawer from "../drawer/Drawer";

export const Navbar = () => {
  const [input, setInput] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

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
            <Link to={`/${input}`}>
              <SearchIcon />
            </Link>
          </div>
        </div>
        <ul className="d-lg-flex gap-2 p-0 d-none">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/watchlist"}>Watchlist</Link>
          </li>
          <li>
            <Link to={"/"}>Login</Link>
          </li>
        </ul>
        <div className="d-lg-none gap-2 p-0 d-block text-white">
          <TemporaryDrawer />
        </div>
      </div>
    </nav>
  );
};
