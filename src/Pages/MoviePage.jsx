import React from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../const";
import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "../components/Comments/Comments";

const COMMENTS_URL = "http://localhost:5005/comments";
function MoviePage() {
  const params = useParams();
  const id = Number(params.movieId);

  const [movie, setMovies] = useState();

  const [comment, setComment] = useState([]);

  useEffect(() => {
    function getAllComments() {
      axios
        .get(`${COMMENTS_URL}`)
        .then((res) => {
          console.log(res.data);
          setComment(res.data);
        })
        .catch((error) => console.log(error));
    }

    getAllComments();
  }, []);
  useEffect(() => {
    function getAllMovies() {
      const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
      const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
      axios
        .get(URL)
        .then((response) => {
          const data = response.data;
          setMovies(response.data);
        })
        .catch((error) => console.log(error));
    }

    getAllMovies();
  }, []); // Add noPage as a dependency
  console.log(comment);
  return (
    <div>
      {movie ? (
        <>
          <h1>{movie.original_title}</h1>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
          <h4>Comments</h4>
          <div>
            {comment.map((each) => {
              if (each.movieId === id) {
                return <p>{each.comment}</p>;
              }
            })}
          </div>
          <Comments movieId={movie.id} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviePage;
