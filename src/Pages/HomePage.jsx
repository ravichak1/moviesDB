import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_KEY } from "../const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faFilm,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import Upcoming from "../components/Upcoming/Upcoming";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Skeleton, Typography, Stack } from "@mui/material";

const BE_URL = "https://moviesbackend-y9t9.onrender.com/";

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [searchMovie, setSearchMovie] = useState("");
  const [inputSearchMovie, setInputSearchmovie] = useState(searchMovie);
  const [noPage, setNoPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const [allFavourites, setAllFavourites] = useState([]);
  const [watchList, setWatchList] = useState([])
  const [allWatchList, setAllWatchList] = useState([])
  const handleSearchMovie = (e) => setSearchMovie(e.target.value);

  const nextPage = (event) => {
    event.preventDefault();
    setNoPage((prevPage) => prevPage + 1);
  };

  const previousPage = (event) => {
    event.preventDefault();
    if (noPage > 1) {
      setNoPage((prevPage) => prevPage - 1);
    }
  };

  const addFavourites = (movie) => {
    const favouritesObj = {
      movieId: movie.id,
      moviesImg: movie.poster_path,
      title: movie.original_title,
    };

    axios
      .post(`${BE_URL}favorites`, favouritesObj)
      .then((res) => {
        setFavourites([res.data, ...favourites]);
      })
      .catch((error) => console.log(error));
  };

  const addwatchList = (movie) => {
    const watchlistObj = {
      movieId: movie.id,
      moviesImg: movie.poster_path,
      title: movie.original_title,
    };

    axios
      .post(`${BE_URL}watchlist`, watchlistObj)
      .then((res) => {
        setWatchList([res.data, ...watchList]);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setInputSearchmovie(searchMovie);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchMovie]);

  const getAllMovies = () => {
    let URL;

    if (inputSearchMovie === "") {
      URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${noPage}`;
    } else {
      URL = `https://api.themoviedb.org/3/search/movie?query=${inputSearchMovie}&api_key=${API_KEY}`;
    }

    axios
      .get(URL)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // setTimeout(() => {
    getAllMovies();
    // }, 1000);
  }, [inputSearchMovie, noPage]);

  const getAllFavMovies = () => {
    axios
      .get(`${BE_URL}favorites`)
      .then((response) => {
        setAllFavourites(response.data);
      })
      .catch((error) => console.error(error));
  };

  const getAllwatchList = () => {
    axios
      .get(`${BE_URL}watchlist`)
      .then((response) => {
        setAllWatchList(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllFavMovies();
  }, [favourites]);

  useEffect(() => {
    getAllwatchList();
  }, [watchList]);
  return (
    <div className=" min-h-[80vh] sm:mt-[5%] md:mt-0">
      <div className="p-4 m-4 flex justify-center text-red-900">
        <Box className="flex items-center gap-4 rounded-full bg-white py-[2%] px-[3%] md:w-[50%] h-[4rem] justify-center sm:w-[100%]">
          <FontAwesomeIcon icon={faFilm} size="2x" />
          <TextField
            label="Search Movie"
            variant="standard"
            value={searchMovie}
            onChange={handleSearchMovie}
            className="text-red-600 font-bold"
          />
        </Box>
      </div>
      <div className="w-[100%] h-[100%] mx-auto mb-8">
        <Upcoming />
      </div>
      <div className="flex flex-wrap gap-[1rem] justify-center w-[100%]">
        {!movies && (
          <div className="flex sm:flex-col md:flex-row gap-4">
            {[...Array(4)].map((_, i) => {
              return (
                <Stack
                  spacing={1}
                  key={i}
                  className="border-2 p-4 sm:w-[100%] md:w-[50%]"
                >
                  {/* For variant="text", adjust the height via font-size */}
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", backgroundColor: "#7f1d1d" }}
                  />

                  {/* For other variants, adjust the size with `width` and `height` */}
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{ backgroundColor: "#7f1d1d" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={210}
                    height={60}
                    sx={{ backgroundColor: "#7f1d1d" }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={210}
                    height={60}
                    sx={{ backgroundColor: "#7f1d1d" }}
                  />
                </Stack>
              );
            })}
          </div>
        )}
        {movies &&
          movies.map((movie) => (
            <div
              key={movie.id}
              className="md:w-[23%] border-2 p-4 flex flex-col hover:shadow-2xl hover:border-0 max-h-min relative sm:w-[70%]"
            >
              <Link
                className="text-black"
                to={`/movie/${movie.id}`}
                noPage={noPage}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt=""
                  className="md:w-[100%] sm:w-[60%] sm:mx-auto"
                />

                <div>
                  <h2 className="h-[30%] text-[120%] font-bold text-red-900">
                    {movie.original_title}
                  </h2>
                </div>
                <div>
                  <p className="text-[80%] text-red-900 font-bold">
                    Released Date: {movie.release_date}
                  </p>
                </div>
              </Link>
              <div className="sm:flex sm:justify-between sm:mt-4 ">
                <button
                  disabled={allWatchList.find(
                    (e) => e.movieId === movie.id
                  )}
                  onClick={() => addwatchList(movie)}
                  className="bg-black border-0  group bg-opacity-0 md:absolute md:bottom-[2%]"
                >
                  {allWatchList.find(
                    (e) => e.title === movie.original_title
                  ) ? (
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="text-red-500 opacity-100"
                      size="2x"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      size="2x"
                      className="group-hover:text-red-300 opacity-100"
                    />
                  )}
                </button>
                <button
                  disabled={allFavourites.find(
                    (each) => each.movieId === movie.id
                  )}
                  onClick={() => addFavourites(movie)}
                  className="bg-black border-0  group bg-opacity-0 md:absolute md:right-[2%] md:bottom-[2%]"
                >
                  {allFavourites.find(
                    (each) => each.title === movie.original_title
                  ) ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-red-500 opacity-100"
                      size="2x"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="2x"
                      className="group-hover:text-red-300 opacity-100"
                    />
                  )}
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="flex items-center justify-center gap-4 text-red-900 font-extrabold mt-4">
        <Link onClick={previousPage}>
          <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
        </Link>
        <h3 className="text-2xl">{noPage}</h3>
        <Link onClick={nextPage}>
          <FontAwesomeIcon icon={faAngleRight} size="2xl" />
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
