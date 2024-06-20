import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
  const ul = document.querySelector("section");
  const header = document.querySelector("header");
  return (
    <header className="z-10 bg-black text-red-900 flex justify-between items-center fixed top-0 w-[100%] left-0 py-[1rem] px-[2%] ">
      <h1 className="text-[150%] font-bold">Pop Corn Time</h1>

      <nav>
        <section className="md:block md:justify-end">
          <ul className="flex gap-[10px] text-xl sm:flex-col sm:absolute sm:right-0 sm:top-[100%] sm:bg-black sm:p-4 sm:w-[100%] md:flex-row sm:mb-[5%] md:relative">
            <li className="sm:hover:bg-red-900 sm:hover:text-black md:hover:bg-none">
              <Link to={"/"} className="">
                {" "}
                Home{" "}
              </Link>
            </li>
            <li className="sm:hover:bg-red-900 sm:hover:text-black">
              <Link onClick={() => setIsOpen((prev) => !prev)}>Genre</Link>
              <div className="flex flex-col absolute bg-red-900  text-black h-[250px] overflow-y-auto">
                {isOpen &&
                  genreList.map((each) => {
                    return (
                      <Link
                        to={`/genre/${each
                          .toLocaleLowerCase()
                          .replace(/ +/g, "")}`}
                        className="hover:bg-black hover:text-red-900 pt-1 px-4"
                      >
                        {each}
                      </Link>
                    );
                  })}
              </div>
            </li>
            <li className="sm:hover:bg-red-900 sm:hover:text-black">
              <Link to={"/"}>Watch List</Link>
            </li>
            <li className="sm:hover:bg-red-900 sm:hover:text-black">
              <Link to={"/favorites"}>Favourite Movies</Link>
            </li>
            <li className="sm:hover:bg-red-900 sm:hover:text-black">
              <Link to={"/topimdb"}>Top IMDB</Link>
            </li>
          </ul>
        </section>
      </nav>
      
        <button
          className="sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
          onClick={(e) => {
            e.preventDefault();
            if (e.currentTarget.name === "menu") {
              e.currentTarget.name = "close";
              ul.classList.add("sm:block");

              ul.classList.remove("sm:hidden");
              // header.classList.add("mb-[45%]");
              console.log("hello");
            } else if (e.currentTarget.name === "close") {
              e.currentTarget.name = "menu";
              ul.classList.add("sm:hidden");
              ul.classList.remove("sm:flex");

              // header.classList.remove("mb-[45%]");
            }
          }}
          name="menu"
        >
          <FontAwesomeIcon icon={faBars} size="2x" className="" />
        </button>
      
    </header>
  );
}

export default Navbar;
