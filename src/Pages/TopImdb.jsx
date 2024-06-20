import React, { useState } from "react";
import { API_KEY } from "../const";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faFilm,
  faAngleLeft,
  faAngleRight,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

const BE_URL = "https://moviesbackend-y9t9.onrender.com/";
function TopImdb() {
  const [movies, setMovies] = useState([]);
  const [noPage, setNoPage] = useState(1);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [allFavourites, setAllFavourites] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [allWatchList, setAllWatchList] = useState([]);

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

  const getAllFavMovies = () => {
    axios
      .get(`${BE_URL}favorites`)
      .then((response) => {
        setAllFavourites(response.data);
      })
      .catch((error) => console.error(error));
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

  const getAllwatchList = () => {
    axios
      .get(`${BE_URL}watchlist`)
      .then((response) => {
        setAllWatchList(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllwatchList();
  }, [watchList]);

  useEffect(() => {
    getAllFavMovies();
  }, [favourites]);

  const getAllMovies = () => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${noPage}`;

    axios
      .get(URL)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllMovies();
  }, [noPage]);

  function sortedTMDB() {
    const sortedByTmdb = movies.toSorted((movieA, movieB) => {
      return Number(movieB.vote_average) - Number(movieA.vote_average);
    });
    setSortedMovies(sortedByTmdb);
    console.log(sortedByTmdb);
  }

  useEffect(() => {
    sortedTMDB();
  }, [movies]);

  return (
    <div className=" sm:mt-[15%] md:mt-[3%] min-h-[80vh]">
      <div className="flex flex-wrap gap-[1rem] justify-center w-[100%]">
        {sortedMovies.map((movie) => (
          <div
            key={movie.id}
            className="sm:w-[70%] md:w-[23%] border-2 p-4 flex flex-col hover:shadow-2xl hover:border-0 max-h-min relative"
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

export default TopImdb;
