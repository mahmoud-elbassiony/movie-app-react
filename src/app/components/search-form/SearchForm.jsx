import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./search-form.css";

export const SearchForm = () => {
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="search-form d-flex align-items-center">
        <input
          style={{
            width: "50%",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
          }}
          type="search"
          name="search"
          value={input}
          placeholder="Find movies tv shows and more ...."
          onChange={handleInput}
        />
        <Link to={`/${input}`}>search</Link>
      </div>
    </div>
  );
};
