import React from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const COMMENTS_URL = "https://moviesbackend-y9t9.onrender.com/";
function Comments({ movieId }) {
  const [comment, setComment] = useState("");

  const handleComment = (e) => setComment(e.target.value);

  function handleCommentSubmit(event) {
    event.preventDefault();
    const request = {
      movieId,
      comment,
    };

    axios
      .post(`${COMMENTS_URL}comments`, request)
      .then((res) => {
        setComment("");
      })
      .catch((error) => console.log(error));
  }
  console.log(comment);
  return (
    <div className="mt-2 w-[100%]">
      <form onSubmit={handleCommentSubmit} className="">
        <Box className="flex gap-4 items-center  w-[100%] rounded">
          <TextField
            fullWidth
            label="Write your Comments"
            id="fullWidth"
            value={comment}
            onChange={handleComment}
            required
            className=""
          />
          <button type="submit" className="bg-black hover:border-red-900"><SendIcon className="text-red-900 font-extrabold"/></button>
          
        </Box>
      </form>
    </div>
  );
}

export default Comments;
