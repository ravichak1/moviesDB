import React from "react";
import { useParams } from "react-router-dom";
import { API_KEY } from "../const";
import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "../components/Comments/Comments";
import Popup from "reactjs-popup";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
const COMMENTS_URL = "https://moviesbackend-y9t9.onrender.com/";
function MoviePage() {
  const params = useParams();
  const id = Number(params.movieId);

  const [movie, setMovies] = useState();

  const [comment, setComment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState();
  function togglePopUp() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    function getAllComments() {
      axios
        .get(`${COMMENTS_URL}comments`)
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
  }, [comment]); // Add noPage as a dependency

  useEffect(() => {
    function getMoviesVideo() {
      const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
      const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

      axios
        .get(URL)
        .then((response) => {
          const data = response.data.results;
          const videoId = data[0].key;
          setVideoId(videoId);
          console.log(videoId);
        })
        .catch((error) => console.log(error));
    }
    getMoviesVideo();
  }, []);
  console.log(movie);
  return (
    <div className="">
      {movie ? (
        <div key={movie.id} className="flex mt-12 rounded py-8 bg-red-900">
          <div className="w-[50%] ">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt=""
              className="w-[70%] aspect-square mx-auto"
            />
            <FontAwesomeIcon
              icon={faCirclePlay}
              onClick={togglePopUp}
              size="3x"
              className="mt-4 flex justify-center w-[100%] "
            />
            {isOpen && (
              <div className="absolute w-[100%] h-[100%] top-0 left-0 bg-black bg-opacity-50">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className=" z-10 absolute text-red-900 top-[10%] right-[10%] hover:text-white"
                  size="3x"
                  onClick={togglePopUp}
                />
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${videoId}`}
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black bg-opacity-10 "
                />
              </div>
            )}
          </div>
          <div className="w-[50%] text-black flex flex-col items-start pr-4">
            <h1 className="mb-4 font-bold">{movie.original_title}</h1>
            <p className="text-start p-4 font-semibold">{movie.overview}</p>
            <div className="flex gap-4">
              <span className="rounded p-2 bg-black text-red-900 font-bold">
                Release Date: {movie.release_date}
              </span>
              <span className="rounded p-2 bg-black text-red-900 font-bold">
                Rating: {Math.round(movie.vote_average * 10) / 10}
              </span>
            </div>

            <h4 className="mt-2">Comments</h4>

            <div className="w-[100%] bg-black flex flex-col gap-2 p-2 rounded">
              {comment.map((each) => {
                if (each.movieId === id) {
                  return (
                    <div className="flex gap-2 items-center">
                      <p className="bg-red-900 w-[100%] py-1 px-4 text-black rounded text-start">
                        {each.comment}
                      </p>
                      <FontAwesomeIcon icon={faCircleXmark} className="text-red-900" size="2x" />
                    </div>
                  );
                }
              })}
            </div>
            <Comments movieId={movie.id} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviePage;
