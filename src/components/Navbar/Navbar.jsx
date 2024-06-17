import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header>
      <h1>Passtime</h1>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Genre</a>
          </li>
          <li>
            <a href="#">Country</a>
          </li>
          <li>
            <a href="#">Movies</a>
          </li>
          <li>
            <a href="#">Top IMDB</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
