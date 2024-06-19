import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_KEY } from "../const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Upcoming from "../components/Upcoming/Upcoming";
import Box from "@mui/material/Box";


import TextField from "@mui/material/TextField";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { Skeleton } from "@mui/material";

const BE_URL = "https://moviesbackend-y9t9.onrender.com/";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [inputSearchMovie, setInputSearchmovie] = useState(searchMovie);
  const [noPage, setNoPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const handleSearchMovie = (e) => setSearchMovie(e.target.value);

  function nextPage(event) {
    event.preventDefault();

    setNoPage((prevPage) => {
      const newNoPage = prevPage + 1;

      return newNoPage;
    });
  }

  function previousPage(event) {
    event.preventDefault();
    if (noPage > 1) {
      setNoPage((prevPage) => {
        const newNoPage = prevPage - 1;

        return newNoPage;
      });
    }
  }

  console.log(movies);
  function addFavourites(movie) {
    const favouritesObj = {
      movieId: movie.id,
      moviesImg: movie.poster_path,
      title: movie.original_title,
    };

    axios
      .post(`${BE_URL}favorites`, favouritesObj)
      .then((res) => {
        setFavourites([res.data, ...favourites]);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }
  console.log(favourites);
  useEffect(() => {
    const handler = setTimeout(() => {
      setInputSearchmovie(searchMovie);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchMovie]);

  function getAllMovies() {
    let URL;

    if (inputSearchMovie === "") {
      URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${noPage}`;
    } else {
      URL = `https://api.themoviedb.org/3/search/movie?query=${inputSearchMovie}&api_key=${API_KEY}`;
    }

    axios
      .get(URL)
      .then((response) => {
        const data = response.data;
        setMovies(data.results);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearchMovie, noPage]);

  return (
    <div className="mt-[2%] ">
      <div className="p-4 m-4 flex justify-center text-red-900">
        <Box className=" flex items-center gap-4 rounded-full bg-white py-[2%] px-[3%] w-[50%] h-[4rem] justify-center">
          <FontAwesomeIcon icon={faFilm} className="" size="2x" />
          <TextField
            // id="input-with-sx"
            label="Search Movie"
            variant="standard"
            value={searchMovie}
            onChange={handleSearchMovie}
            className="text-red-600 font-bold"
          />
        </Box>
      </div>
      <div className="w-[100%]">
        <Upcoming />
      </div>

      <div className="flex flex-wrap gap-[1rem] justify-center w-[100%]">
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-[23%] border-2 p-4 flex flex-col hover:shadow-2xl hover:border-0 max-h-min relative"
            >
              <Link
                className="text-black"
                to={`/movie/${movie.id}`}
                noPage={noPage}
              >
                
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt=""
                    className="w-[100%]"
                  />
               

                <div>
                  <h2 className="h-[30%] text-[120%] font-bold text-red-900">
                    {movie.original_title }
                  </h2>
                </div>
                <div>
                  <p className="text-[80%] text-red-900 font-bold">
                    Released Date : {movie.release_date}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end mt-4">
                <Link
                  disabled={
                    favourites.find(
                      (each) => each.title === movie.original_title
                    )
                      ? true
                      : false
                  }
                  onClick={() => {
                    addFavourites(movie);
                  }}
                >
                  {favourites.find(
                    (each) => each.title === movie.original_title
                  ) ? (
                    <FontAwesomeIcon icon={faHeart} className="text-red-500"  size="2x"/>
                  ) : (
                    <FontAwesomeIcon icon={faHeart} size="2x" className="hover:text-red-300"/>
                  )}
                </Link>
              </div>
            </div>
          );
        })}
        <div className="flex items-center gap-4 text-red-900 font-extrabold mt-4">
          <Link onClick={previousPage} className="">
            <FontAwesomeIcon icon={faAngleLeft} size="2xl"/>
          </Link>
          <h3 className="text-2xl">{noPage}</h3>
          <Link onClick={nextPage} className="">
            <FontAwesomeIcon icon={faAngleRight} size="2xl"/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
