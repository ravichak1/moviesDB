import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/ChevronRight";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const genreId = genreIdMap[genre.toLowerCase()]
  const [movies, setMovies] = useState([]);
  const [noPage, setNoPage] = useState(1);
  function nextPage(event) {
    event.preventDefault();

    setNoPage((prevPage) => {
      const newNoPage = prevPage + 1;

      return newNoPage;
    });
  }
  console.log(genreId)
  function previousPage(event) {
    event.preventDefault();
    if (noPage > 1) {
      setNoPage((prevPage) => {
        const newNoPage = prevPage - 1;

        return newNoPage;
      });
    }
  }
  console.log(genreId)
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
  }, [noPage]); // Add noPage as a dependency
  console.log(movies);
  console.log(movies);
  return (
    <div>
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
                <div className="absolute bottom-1 right-1">
                  <BookmarkBorderIcon />
                </div>
              </Link>
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

export default GenrePage;
