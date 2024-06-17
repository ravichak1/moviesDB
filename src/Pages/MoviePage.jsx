import React from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../const";
import axios from "axios";
import { useEffect, useState } from "react";

function MoviePage() {
 const params = useParams()
 const id = Number(params.movieId)

 const [movie, setMovies] = useState();

  useEffect(() => {
    function getAllMovies() {
      const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
      const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
      axios
        .get(URL)
        .then((response) => {
            console.log(response.data)
          const data = response.data;
          setMovies(response.data);
        })
        .catch((error) => console.log(error));
    }

    getAllMovies();
  }, []); // Add noPage as a dependency


 console.log(movie)
  return (
    <div>
      {movie ? (
        <>
          <h1>{movie.original_title}</h1>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
          
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviePage;
