import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="z-10 bg-white flex justify-between items-center fixed top-0 w-[98%] right-0 p-[1rem] mx-auto">
      <h1 className="text-[150%] font-bold">Pop Corn Time</h1>
      <nav>
        <ul className="flex gap-[10px]">
          <li>
            <Link to={"/"} className="text-black">
              {" "}
              Home{" "}
            </Link>
          </li>
          <li>
            <Link onClick={()=> setIsOpen((prev)=> !prev)}>Genre
            </Link>
            {isOpen && (
              
              <ul className="flex flex-col bg-black text-white absolute">
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
                  <Link to={"/genre/documentry"}>Documentry</Link>
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
              
            )}
          </li>
          <li>
            <Link to={"/"} className="text-black">
              Country
            </Link>
          </li>
          <li>
            <Link to={"/favorites"} className="text-black">
              Favourite Movies
            </Link>
          </li>
          <li>
            <Link to={"/"} className="text-black">
              Top IMDB
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;


