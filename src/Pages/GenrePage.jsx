import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/ChevronRight";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useParams } from "react-router-dom";
import { API_KEY } from "../const";
import { Link } from "react-router-dom";

import { faFilm, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


import TextField from "@mui/material/TextField";
const BE_URL = "https://moviesbackend-y9t9.onrender.com/";
const genreIdMap = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  sciencefiction: 878,
  tvmovie: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
};

function GenrePage() {
  const { genre } = useParams();
  console.log(genre);
  const genreId = genreIdMap[genre];
  const [movies, setMovies] = useState([]);
  const [noPage, setNoPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState("");
  const [inputSearchMovie, setInputSearchmovie] = useState(searchMovie);
  const [favourites, setFavourites] = useState([]);
  const [allFavourites, setAllFavourites] = useState([]);
  const [watchList, setWatchList] = useState([])
  const [allWatchList, setAllWatchList] = useState([])
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
  console.log(genreId);
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
  const getAllFavMovies = () => {
    axios
      .get(`${BE_URL}favorites`)
      .then((response) => {
        setAllFavourites(response.data);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getAllFavMovies();
  }, [favourites]);
  console.log(genreId);
  useEffect(() => {
    function getAllMovies() {
      const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
      const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${noPage}`;
      axios
        .get(URL)
        .then((response) => {
          console.log(response.data);
          const data = response.data;
          setMovies(data.results);
        })
        .catch((error) => console.log(error));
    }

    getAllMovies();
  }, [noPage, genre]); // Add noPage as a dependency
  console.log(movies);
  console.log(movies);
  return (
    <div className="sm:mt-4 min-h-[80vh]">
      <div className="p-4 m-4 flex justify-center text-red-900">
        <Box className=" flex items-center gap-4 rounded-full bg-white py-[2%] px-[3%] md:w-[50%] h-[4rem] justify-center sm:w-[100%]">
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
      

      <div className="flex flex-wrap gap-[1rem] justify-center w-[100%]">
        {movies.map((movie) => {
          return (
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
                    Released Date : {movie.release_date}
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
          );
        })}
        
      </div>
      <div className="flex items-center justify-center gap-4 text-red-900 font-extrabold mt-4">
          <Link onClick={previousPage} className="">
            <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
          </Link>
          <h3 className="text-2xl">{noPage}</h3>
          <Link onClick={nextPage} className="">
            <FontAwesomeIcon icon={faAngleRight} size="2xl" />
          </Link>
        </div>
    </div>
  );
}

export default GenrePage;
