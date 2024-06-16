import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
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

  console.log(noPage);

  const [movies, setMovies] = useState([]);
  // function getAllMovies() {
  //   const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
  //   const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${noPage}`;
  //   axios
  //     .get(URL)
  //     .then((response) => {
  //       c
  //       console.log(response.data);
  //       const data = response.data;
  //       // console.log(data.results)
  //       setMovies(data.results);
  //     })
  //     .catch((error) => console.log(error));
  // }
  // useEffect(() => {
  //   getAllMovies();
  // }, [noPage]);

  useEffect(() => {
    function getAllMovies() {
      const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
      const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${noPage}`;
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
  return (
    <>
      <h1>Pass Time</h1>
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
      </div>
      <div>
        <button onClick={nextPage}>next Page</button>
      </div>
      <div>
        <button onClick={previousPage}>previous page</button>
      </div>
    </>
  );
}

export default App;
