import React, {useState} from 'react';
const axios = require ('axios');

function Library () {

  const [songs, setSongs] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 

 const addSong = (title, artist, duration) => {
  const newSong = { id: Date.now(), title, artist, duration };
  setSongs([...songs, newSong]);
};


const getPlaylists = () => {
  axios.get('/api/library')
  .then(response => {
    setSongs(response.data); 
  })
  .catch(error => {
    console.error('Error fetching playlists:', error);
  });
};

// const getSongs = () => {
//   axios.get('/api/songs')
//     .then(response => {
//       setSongs(response.data); 
//     })
//     .catch(error => {
//       console.error('Error fetching songs:', error);
//     });
// };



const filteredSongs = songs.filter((song) =>
  song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  song.artist.toLowerCase().includes(searchQuery.toLowerCase())
);


return (
  <div className='library-playlist' style={{ border: "2px solid black", padding: "10px", borderRadius: "8px", width: "300px" }}>
    
     <h2>🎵 Library Playlist🎵</h2>
     <input
        type="text"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
       <button onClick={() => addSong("Shape of You", "Ed Sheeran", "3:53")}>
        ➕ Add "Shape of You"
      </button>
      
      <ul>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <li key={song.id}>
              {song.title} - {song.artist} ({song.duration})
            </li>
          ))
        ) : (
          <p>No songs found.</p>
        )}
      </ul>
  </div>
)

}
export default Library;