import React from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useEffect, useState } from "react";
const COMMENTS_URL = "https://moviesbackend-y9t9.onrender.com/";
function Comments({ movieId }) {
  const [comment, setComment] = useState('');

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
 
  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <Box className="flex justify-center items-center gap-4 rounded-2xl bg-black bg-opacity-10 w-[100%] p-4">
          <TextField
            fullWidth
            label="Write your Comments"
            id="fullWidth"
            value={comment}
            onChange={handleComment}
          />
          <button type="submit">
            <SendIcon />
          </button>
        </Box>
      </form>
    </div>
  );
}

export default Comments;
