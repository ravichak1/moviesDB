import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
const COMMENTS_URL = "https://moviesbackend-y9t9.onrender.com/";

const Comments = ({ movieId, onAddComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const commentData = {
        movieId: movieId,
        comment: newComment,
      };

      axios
        .post(`${COMMENTS_URL}comments`, commentData)
        .then((response) => {
          onAddComment(response.data); // Call the callback function with the new comment
          setNewComment(""); // Clear the input
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="mt-4 flex w-[90%] gap-2 items-center mx-auto">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 rounded bg-white"
        placeholder="Write your comment"
        required
      ></textarea>
      <button
        onClick={handleAddComment}
        className="bg-red-900 text-white p-2 rounded mt-2 border-0"
      >
        <FontAwesomeIcon icon={faPaperPlane} size='2x'/>
      </button>
    </div>
  );
};

export default Comments;
