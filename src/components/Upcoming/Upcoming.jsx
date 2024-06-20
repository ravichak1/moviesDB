import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Upcoming() {
  const [movies, setMovies] = useState([]);
  function sliderRight() {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 220;
  }

  function sliderLeft() {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 220;
  }
  function comingSoon() {
    const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
    const URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&region=US`;

    axios
      .get(URL)
      .then((response) => {
        const data = response.data;
        setMovies(data.results);
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    comingSoon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h3 className="text-red-900 text-2xl font-bold">Upcoming Movies</h3>
      <div className="relative flex items-center">
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          onClick={sliderLeft}
          size="3x"
          className="z-10  text-red-900"
        />
        <div
          id="slider"
          className="w-[100%] h-full overflow-x-hidden overflow-y-hidden whitespace-nowrap scroll-smooth scroll-w-0"
        >
          {movies.map((movie) => {
            return (
              <>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt=""
                    className="w-[220px]  inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                  />
                </Link>
              </>
            );
          })}
        </div>
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          onClick={sliderRight}
          size="3x"
          className="z-10  text-red-900"
        />
      </div>
    </div>
  );
}

export default Upcoming;

{
  /* <div className="flex flex-col gap-4 mb-12">
      <h3 className="font-bold text-[2rem] text-red-900">Upcoming Movies</h3>
      <div className="w-[100%] flex gap-2 bg-red-900 p-4  rounded-xl"> 
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="w-[20%] flex">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
                className="w-[100%]"
              />
            </div>
          );
        })}
      </div>
    </div> */
}
