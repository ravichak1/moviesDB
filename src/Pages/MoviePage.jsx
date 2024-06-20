import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Comments from "../components/Comments/Comments";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { API_KEY } from "../const";
const COMMENTS_URL = "https://moviesbackend-y9t9.onrender.com/";
const BE_URL = "https://moviesbackend-y9t9.onrender.com/";
function MoviePage() {
  const params = useParams();
  const id = Number(params.movieId);
  const [movie, setMovies] = useState(null);
  const [comment, setComment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState();
  const [genres, setGenres] = useState([]);
  let newId;
  function togglePopUp() {
    setIsOpen(!isOpen);
  }
  function getAllComments() {
    axios
      .get(`${COMMENTS_URL}comments`)
      .then((res) => {
        console.log(res.data);
        setComment(res.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getAllComments();
  }, [id]);

  function deleteComment(newId) {
    axios
      .delete(`${BE_URL}comments/${newId}`)
      .then(() => {
        getAllComments();
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    deleteComment(id);
  }, [newId]);

  useEffect(() => {
    function getAllMovies() {
      // const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
      const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
      axios
        .get(URL)
        .then((response) => {
          setMovies(response.data);
          setGenres(response.data.genres);
        })
        .catch((error) => console.log(error));
    }

    getAllMovies();
  }, [id]);
  console.log(movie);
  useEffect(() => {
    function getMoviesVideo() {
      // const API_KEY = "71b8999b4e573d85fb4f770b5ee1650e";
      const URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

      axios
        .get(URL)
        .then((response) => {
          const data = response.data.results;
          if (data.length > 0) {
            setVideoId(data[0].key);
          }
        })
        .catch((error) => console.log(error));
    }

    getMoviesVideo();
  }, [id]);

  const handleAddComment = (newComment) => {
    setComment((prevComments) => [...prevComments, newComment]);
  };

  console.log(movie);
  console.log(genres);

  return (
    <div className="md:my-[0] sm:my-[10%] min-h-[80vh]">
      {movie ? (
        <div
          key={movie.id}
          className="flex mt-12 rounded py-8 bg-red-900 sm:flex-col md:flex-row"
        >
          <div className="md:w-[50%] sm:w-[100%]">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt=""
              className="md:w-[70%] aspect-square mx-auto sm:w-[90%]"
            />
            <FontAwesomeIcon
              icon={faCirclePlay}
              onClick={togglePopUp}
              size="3x"
              className="mt-4 flex justify-center w-[100%]"
            />
            <p className="text-black text-xl font-bold">
              Here you can Watch the Trailer
            </p>
            {isOpen && (
              <div className="z-10 absolute w-[100%] h-[100%] top-0 left-0 bg-black bg-opacity-50">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="z-10 absolute text-red-900 top-[10%] right-[10%] hover:text-white"
                  size="3x"
                  onClick={togglePopUp}
                />
                <ReactPlayer
                  height="50%"
                  width="70%"
                  controls={false}
                  url={`https://www.youtube.com/watch?v=${videoId}`}
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black bg-opacity-10"
                />
              </div>
            )}
          </div>
          <div className="md:w-[50%] text-black flex flex-col items-start pr-4 sm:mt-[5%]">
            <h1 className="mb-4 font-bold text-2xl">{movie.original_title}</h1>
            <p className="text-start p-4 font-semibold">{movie.overview}</p>
            <div className="flex gap-4 sm:flex-col sm:items-center sm:w-[100%] md:flex-row">
              <span className="rounded p-2 bg-black text-red-900 font-bold ">
                Release Date: {movie.release_date}
              </span>
              <span className="rounded p-2 bg-black text-red-900 font-bold">
                Rating: {Math.round(movie.vote_average * 10) / 10}
              </span>
              <span className="rounded p-2 bg-black text-red-900 font-bold">
                Rating:{" "}
                {`${Math.floor(movie.runtime / 60)}hrs ${
                  movie.runtime % 60
                }mins`}
              </span>
            </div>
            <div className="flex gap-4 mt-4 sm:flex-col sm:items-center sm:w-[100%] md:flex-row">
              {genres.map((e) => {
                return (
                  <>
                    <span className="rounded p-2 bg-black text-red-900 font-bold">
                      {e.name}
                    </span>
                  </>
                );
              })}
            </div>

            <h4 className="mt-2">Comments</h4>

            <div className="w-[90%] mx-auto bg-black flex flex-col gap-2 p-2 rounded h-[200px] overflow-y-auto">
              {comment
                .filter((each) => each.movieId === id)
                .map((each) => (
                  <div key={each.id} className="flex gap-2 items-center">
                    <p className="bg-red-900 w-[100%] py-1 px-4 text-black rounded text-start">
                      {each.comment}
                    </p>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      className="text-red-900 hover:text-white"
                      size="2x"
                      onClick={() => {
                        console.log(each.id);
                        deleteComment(each.id);
                      }}
                    />
                  </div>
                ))}
            </div>
            <Comments movieId={movie.id} onAddComment={handleAddComment} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MoviePage;
