import React, { Children } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Upcoming from "../components/Upcoming/Upcoming";
function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [inputSearchMovie, setInputSearchmovie] = useState(searchMovie);
  const [noPage, setNoPage] = useState(1);
  function nextPage(event) {
    event.preventDefault();
    console.log("hello");

    setNoPage((prevPage) => {
      const newNoPage = prevPage + 1;
      console.log(newNoPage);
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
  const handleSearchMovie = (e) => setSearchMovie(e.target.value);

  useEffect(() => {
    const handler = setTimeout(() => {
        setInputSearchmovie(searchMovie);
      }, 500);
  
      return () => {
        clearTimeout(handler);
      };
    }, [searchMovie]);


  function getAllMovies(){
    const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
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

  useEffect(()=>{
    getAllMovies()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[inputSearchMovie, noPage])

  return (
    <div>
      <div>
        <input type="text" value={searchMovie} onChange={handleSearchMovie} />
      </div>
     
      <div>
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <h1>{movie.original_title}</h1>
              <p>{movie.overview}</p>
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt=""
                width={150}
              />
            </div>
          );
        })}
        <div>
        <button onClick={nextPage}>next Page</button>
      </div>
      <div>
        <button onClick={previousPage}>previous page</button>
      </div>
      </div>
      <div>
        <Upcoming />
      </div>
    </div>
  );
}

export default HomePage;
