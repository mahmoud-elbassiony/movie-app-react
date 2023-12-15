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
          </div>
        </div>
      </div>
    </nav>
  );
};
