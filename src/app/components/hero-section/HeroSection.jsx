import React from "react";
import { useState } from "react";
import { SearchForm } from "../search-form/SearchForm";
import landingImg from "../../../assests/hero.jpg";
import "./hero-section.css";

export const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${landingImg})` }}
    >
      <div className="hero-content text-white container">
        <div className="">
          <p>A FILM BY CHRISTOPHER NOLAN</p>
          <h1>OPENHEIMER</h1> <button className="btn ">Watch Now!</button>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div style={{ backgroundColor: "#eee" }} className="py-5">

  //     <SearchForm />
  //   </div>
  // );
};
