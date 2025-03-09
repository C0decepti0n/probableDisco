

//useState -manage component state
//useEffect- fetching data on mount
import React, { useState, useEffect } from "react";
import Search from "./Search.jsx";
const axios = require("axios"); // handles HTTP request


// deines Library component
function Library() {
  // holds playlist, updated playlist = empty array
  const [playlists, setPlaylists] = useState([]);

  const [playlistName, setPlaylistName] = useState("");
//renaming playlist
const [editingPlaylistId, setEditingPlaylistId] = useState(null); // To keep track of the playlist being renamed
  //store new playlist names when creating one

  const [newPlaylist, setNewPlaylist] = useState(
   // {


  //   name: "",
  //   songs: [
  //     {
  //       trackId: 0,
  //       title: "",
  //       link: "",
  //       preview: "",
  //       artist: { name: "", id: 0 },
  //       album: { title: "", id: 0 },
  //     },
  //   ],
  // }
);
//fetch playlists when component mounts
useEffect(() => {
  getPlaylists();
}, []);


//get request to 
  const getPlaylists = () => {
    axios
      .get("/library")
      .then((response) => {
        console.log("Fetched playlists:", response.data); // Log the response data

        setPlaylists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  };


  const handleInput = (e) => {
    e.preventDefault(); // Prevent page reload
    if (playlistName.trim() !== "") {
      addPlaylist(playlistName); // Add playlist if name is provided
    }
  };

  const handlePlaylistClick = (playlistId) => {
    console.log("Playlist clicked with ID:", playlistId);
  }

  
  const handleDelete = (e) => {

  };


const handleRename = (playlistId, currentName) =>{
  setEditingPlaylistId(playlistId)
  setNewPlaylist(currentName)
}


  const addPlaylist = (playlistName) => {
    axios
      .post("/library", {
        name: playlistName,
        songs: [],
      })
      .then((response) => {
        console.log("Success adding playlist:", response.data);
        getPlaylists();
        setPlaylistName("")
      })
      .catch((err) => {
        console.error("Error adding playlist", err);
      });
  };

  const updatePlaylist = (playlistId, newName) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((playlist) =>
        playlist._id === playlistId ? { ...playlist, name: newName } : playlist
      )
    );
    axios
      .patch(`/library/${playlistId}`, {name:newName})
      .then(() => {
        getPlaylists();
        setEditingPlaylistId(null);
      })
      .catch((err) => {
        console.error("error updating playlist:", err);
      });
  };

  const deletePlaylist = (playlistId) => {
    axios
      .delete(`/library/${playlistId}`) 
      .then(() => {
        setPlaylists((prevPlaylists) =>
          prevPlaylists.filter((playlist) => playlist._id !== playlistId)
        );
      })
      .catch((err) => {
        console.error("Error deleting playlist:", err);
      });
  };
  
  return (
    <div
      className="library-playlist"
      style={{
        border: "2px solid black",
        padding: "10px",
        borderRadius: "8px",
        width: "300px",
      }}
    >
      <h2>🎵 Library Playlist🎵</h2>
      
      <form onSubmit={handleInput}>
        <input
          type="text"
          value={playlistName}
          placeholder="Enter playlist name"
          onChange={(e) => setPlaylistName(e.target.value)} // Update state on input change
        />
        <button className="submit-button" type="submit">
          ➕
        </button>
      </form>
     
      <ul>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <li key={playlist._id}>
              {editingPlaylistId === playlist._id ? (
                <div>
                  <input
                    type="text"
                    value={newPlaylist}
                    onChange={(e) => setNewPlaylist(e.target.value)} // Update new playlist name
                    placeholder="Enter new playlist name"
                  />
                  <button onClick={() => updatePlaylist(playlist._id, newPlaylist)}>
                    Save
                  </button>
                  <button onClick={() => setEditingPlaylistId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>
                    
                  <button
                      style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                      onClick={() => handlePlaylistClick(playlist._id)}
                    >
                    
                    
                    
                    
                    {playlist.name}
                    </button>
                    
                    
                    </h3>

                    
                  <button onClick={() => handleRename(playlist._id, playlist.name)}>
                    ✏ Rename
                  </button>
                  <button onClick={() => deletePlaylist(playlist._id)}>
                    🗑 Delete
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No playlists found.</p>
        )}
      </ul>
    </div>
  );
}
export default Library;
