import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header className="flex justify-between items-center">
      <h1>Passtime</h1>
      <nav>
        <ul className="flex gap-[10px]">
          <li>
            <Link to={"/"}> Home </Link>
          </li>
          <li className="group">
            Genre
            <ul className="w-[30%] hidden group-hover:flex flex-wrap gap-4 absolute bg-black text-red-500">
              <li>
                <Link to={"/genre/action"}>Action</Link>
              </li>

              <li>
                <Link to={"/genre/adventure"}>Adventure</Link>
              </li>
              <li>
                <Link to={"/genre/animation"}>Animation</Link>
              </li>
              <li>
                <Link to={"/genre/comedy"}>Comedy</Link>
              </li>
              <li>
                <Link to={"/genre/crime"}>Crime</Link>
              </li>
              <li>
                <Link to={"/genre/documentation"}>Documentation</Link>
              </li>
              <li>
                <Link to={"/genre/drama"}>Drama</Link>
              </li>
              <li>
                <Link to={"/genre/family"}>Family</Link>
              </li>
              <li>
                <Link to={"/genre/fantasy"}>Fantasy</Link>
              </li>
              <li>
                <Link to={"/genre/history"}>History</Link>
              </li>
              <li>
                <Link to={"/genre/horror"}>Horror</Link>
              </li>
              <li>
                <Link to={"/genre/mystery"}>Mystery</Link>
              </li>
              <li>
                <Link to={"/genre/romance"}>Romance</Link>
              </li>
              <li>
                <Link to={"/genre/fiction"}>Science Fiction</Link>
              </li>
              <li>
                <Link to={"/genre/thriller"}>Thriller</Link>
              </li>
              <li>
                <Link to={"/genre/tvmovie"}>TV Movie</Link>
              </li>
              <li>
                <Link to={"/genre/war"}>War</Link>
              </li>
              <li>
                <Link to={"/genre/western"}>Western</Link>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">Country</a>
          </li>
          <li>
            <a href="#">Favourite Movies</a>
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
