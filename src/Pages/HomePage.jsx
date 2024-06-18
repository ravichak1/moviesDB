import React, { Children } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_KEY } from "../const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Upcoming from "../components/Upcoming/Upcoming";
import Box from "@mui/material/Box";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/ChevronRight";
import TextField from "@mui/material/TextField";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

const BE_URL = "https://moviesbackend-y9t9.onrender.com/";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [inputSearchMovie, setInputSearchmovie] = useState(searchMovie);
  const [noPage, setNoPage] = useState(1);

  const [favourites, setFavourites] = useState([]);
  function nextPage(event) {
    event.preventDefault();

    setNoPage((prevPage) => {
      const newNoPage = prevPage + 1;

      return newNoPage;
    });
  }

  function addFavourites(movie) {
    const favouritesObj = {
      movieId: movie.id,
      moviesImg: movie.poster_path,
      title: movie.original_title,
    };

    axios
      .post(`${BE_URL}favorites`, favouritesObj)
      .then((res) => {
        setFavourites(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }
  console.log(favourites);
  function previousPage(event) {
    event.preventDefault();
    if (noPage > 1) {
      setNoPage((prevPage) => {
        const newNoPage = prevPage - 1;

        return newNoPage;
      });
    }
  }
  const handleSearchMovie = (e) => setSearchMovie(e.target.value);

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
  console.log(movies);
  useEffect(() => {
    getAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearchMovie, noPage]);
  console.log(API_KEY);
  console.log(noPage);
  return (
    <div>
      <div className="p-4 m-4 flex justify-center">
        <Box className="flex justify-center items-center gap-4 rounded-2xl bg-black bg-opacity-10 w-[100%] p-4">
          <LocalMoviesIcon className="scale-150" />
          <TextField
            id="input-with-sx"
            label="Search Movie"
            variant="standard"
            value={searchMovie}
            onChange={handleSearchMovie}
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
                  <h2 className="h-[30%] text-[100%] font-bold">
                    {movie.original_title}
                  </h2>
                </div>
                <div>
                  <p className="text-[80%]">{movie.release_date}</p>
                </div>
              </Link>
              <div className="absolute bottom-1 right-1">
                <button
                  onClick={() => {
                    addFavourites(movie);
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} className="" />
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex items-center gap-4">
          <button onClick={previousPage} className="">
            <KeyboardArrowLeftIcon />
          </button>
          <h3>{noPage}</h3>
          <button onClick={nextPage} className="">
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
