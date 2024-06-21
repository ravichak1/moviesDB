import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css"
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hamBurger,setHamBurger] = useState (false)
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
    <header className="z-10 bg-black h-[10%] text-red-900 flex justify-between items-center fixed top-0 w-[100%] left-0 py-[1rem] px-[2%] ">
      <h1 className="text-[150%] font-bold"><Link to={"/"}>Pop Corn Time</Link></h1>

      <nav>
        <section className={`md:block md:justify-end mt-4 ${hamBurger ? 'sm:block' : 'sm:hidden'}`}>
          <ul className="flex gap-[10px] text-xl sm:flex-col sm:absolute sm:right-0 sm:top-[100%] sm:bg-black sm:p-4 sm:w-[100%] md:flex-row sm:mb-[5%] md:relative ">
            <li className="sm:hover:bg-red-900 sm:hover:text-black md:hover:bg-none rounded">
              <Link to={"/"} className="px-2"  onClick={()=>  setHamBurger(isYes => !isYes)}>  
                
                Home
              </Link>
            </li>
            <li className="sm:hover:bg-red-900 sm:hover:text-black rounded relative">
              <Link onClick={() => setIsOpen((prev) => !prev)} className="px-2">Genre</Link>
              <div className="flex flex-col absolute bg-red-900  text-black h-[250px] overflow-y-auto scrollbar sm:left-[50%] sm:translate-x-[-50%] scrollbar-thumb-black">
                {isOpen &&
                  genreList.map((each) => {
                    return (
                      <Link
                        to={`/genre/${each
                          .toLocaleLowerCase()
                          .replace(/ +/g, "")}`}
                        className="hover:bg-black hover:text-red-900 pt-1 px-4"
                        onClick={()=>  {
                          setHamBurger(isYes => !isYes)
                          setIsOpen((prev)=>!prev)}}>
                        {each}
                      </Link>
                    );
                  })}
              </div>
            </li>
            <li className="sm:hover:bg-red-900 sm:hover:text-black rounded">
              <Link to={"/watchlist"} className="px-2" onClick={()=>  setHamBurger(isYes => !isYes)}>Watch List</Link>
            </li>
            <li className="sm:hover:bg-red-900 sm:hover:text-black rounded">
              <Link to={"/favorites"} className="px-2" onClick={()=>  setHamBurger(isYes => !isYes)}>Favourite Movies</Link>
            </li>
            <li className="sm:hover:bg-red-900 sm:hover:text-black rounded">
              <Link to={"/topimdb"} className="px-2" onClick={()=>  setHamBurger(isYes => !isYes)}>Top IMDB</Link>
            </li>
          </ul>
        </section>
      </nav>
      
        <button
          className="sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
          onClick={(e) => {
            e.preventDefault();
            setHamBurger(isYes => !isYes)
            console.log(hamBurger)
            
            }
          }
          name="menu"
        >
          <FontAwesomeIcon icon={faBars} size="2x" className="" />
        </button>
      
    </header>
  );
}

export default Navbar;
