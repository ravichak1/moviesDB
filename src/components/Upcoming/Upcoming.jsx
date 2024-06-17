import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
function Upcoming() {
    const [movies, setMovies] = useState([]);

    function comingSoon(){
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
    useEffect(()=>{
        comingSoon()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
  return (
    <div>Upcoming</div>
  )
}

export default Upcoming