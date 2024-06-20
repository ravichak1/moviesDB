import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const genreList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
    "TV Movie",
    "War",
    "Western",
  ];
  return (
    <header className="z-10 bg-black text-red-900 flex justify-between items-center fixed top-0 w-[100%] left-0 py-[1rem] px-[2%]">
      <h1 className="text-[150%] font-bold">Pop Corn Time</h1>
      <nav>
        <ul className="flex gap-[10px] text-2xl">
          <li>
            <Link to={"/"} >
              {" "}
              Home{" "}
            </Link>
          </li>
          <li>
            <Link onClick={() => setIsOpen((prev) => !prev)}>Genre</Link>
            <div className="flex flex-col absolute bg-red-900  text-black h-[250px] overflow-y-auto">
              {isOpen &&
                genreList.map((each) => {
                  
                  return (
                   
                    <Link to={`/genre/${each.toLocaleLowerCase().replace(/ +/g, "")}`} className="hover:bg-black hover:text-red-900 pt-1 px-4">{each}</Link>
                    
                  );
              
                })}
            </div>
          </li>
          <li>
            <Link to={"/"} >
              Watch List
            </Link>
          </li>
          <li>
            <Link to={"/favorites"} >
              Favourite Movies
            </Link>
          </li>
          <li>
            <Link to={"/topimdb"} >
              Top IMDB
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

