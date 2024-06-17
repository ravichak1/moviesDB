import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
function Upcoming() {
  const [movies, setMovies] = useState([]);

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
    <div className="flex flex-col gap-4 mb-12">
      <h3>Upcoming Movies</h3>
      <div className="flex gap-1 bg-black p-4 bg-opacity-10 rounded-xl"> 
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
    </div>
  );
}

export default Upcoming;
