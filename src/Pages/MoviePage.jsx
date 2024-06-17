import React from "react";
import { useParams } from "react-router-dom";
function MoviePage({movies}) {
  let {movieId} = useParams()
  console.log(movieId)
  console.log(movies)
  const movie = movies.find((each)=> each.id === movieId)
  console.log(movie)
  return <div>MoviePage</div>;
}

export default MoviePage;
