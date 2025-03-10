//omport react and hooks needed for state and lifecycle
import React, { useState, useEffect } from 'react';
//import axios to make HTTP requests
import axios from 'axios';

//create the Comments component
const Comments = ({ songId, theme }) => {

  //stateto hold the list of comments from the server


const Comments = ({ trackId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments for the song
  useEffect(() => {
    axios.get(`/comments?songId=${trackId}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [trackId]);

  // Handle adding a comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    axios.post("/comments", { songId: trackId, content: newComment })
      .then((res) => {
        setComments([...comments, res.data]); // Update UI
        setNewComment(""); // Clear input
      })
      .catch((err) => console.error("Error adding comment:", err));
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}
};

export default Comments;
