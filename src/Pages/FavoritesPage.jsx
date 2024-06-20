import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
const BE_URL = "https://moviesbackend-y9t9.onrender.com/";
function FavoritesPage() {
  const [movies, setMovies] = useState([]);
  const [noPage, setNoPage] = useState(1);
  const navigate = useNavigate()
 let id;
  function deleteFav(id){
    axios
    .delete(`${BE_URL}favorites/${id}`)
    .then(()=>{
      navigate('/favorites')
    }
    ).catch((error)=> console.log(error))
  }

  useEffect(()=>{
    deleteFav(id);
  },[id])
  function getAllMovies() {
    axios
      .get(`${BE_URL}favorites`)
      .then((response) => {
        const data = response.data;
        setMovies(data);
        console.log(response.data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }
  console.log(movies);
  useEffect(() => {
    getAllMovies();
   
  }, []);
  console.log(movies)
  return (
    <div className="my-[3%] min-h-[80vh]">
      <h1 className="my-[10%] text-4xl text-red-900">FavoritesPage</h1>
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-[23%] border-2 p-4 flex flex-col hover:shadow-2xl hover:border-0 max-h-min relative"
            >
              <div><FontAwesomeIcon icon={faCircleXmark} onClick={()=>{
                console.log(movie.id)
                deleteFav(movie.id)
              }} className="text-red-900"/></div>
              <Link
                className="text-black"
                to={`/movie/${movie.movieId}`}
                noPage={noPage}
              >
                
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.moviesImg}`}
                  alt=""
                  className="w-[100%]"
                />

                <div>
                  <h2 className="h-[30%] text-[100%] font-bold">
                    {movie.title}
                  </h2>
                </div>
                <div>
                  <p className="text-[80%]">{movie.release_date}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesPage;
