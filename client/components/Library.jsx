import React, { useState, useEffect } from 'react';
const axios = require('axios');

const Library = (props)=>{
const [playlists, setPlaylists] = useState([]);


//fetch data from api when compenents mount
useEffect(() => {})

const getLibrary = () => {
  axios.get('/')
  .then(()=>{

  })
  .catch((err)=>{
    console.error(err)
  })
};
const addLibrary= () => {
  axios.post('/')
  .then(()=>{

  })
  .catch((err)=>{
    console.error(err)
  })
};
const updateLibrary = () => {
  axios.patch('/')
  .then(()=>{

  })
  .catch((err)=>{
    console.error(err)
  })
};

const deleteLibrary= () => {
  axios.delete('/')
  .then(()=>{

  })
  .catch((err)=>{
    console.error(err)
  })
};  



  const playlist = [
   [ 
    { title: 'On the Run', artist: 'Beyonce' },
    { title: 'Superstar', artist: 'Usher' },
    { title: 'Man Down', artist: 'Rihanna' },
    { title: 'Under The Influence', artist: 'Chris Brown' },
    { title: 'ICU', artist: 'Coco Jones' }
   ],
    [

      { title: 'On the Run', artist: 'Beyonce' },
    { title: 'Superstar', artist: 'Usher' },
    { title: 'Man Down', artist: 'Rihanna' },
    { title: 'Under The Influence', artist: 'Chris Brown' },
    { title: 'ICU', artist: 'Coco Jones' }

    ],

    [

      { title: 'On the Run', artist: 'Beyonce' },
    { title: 'Superstar', artist: 'Usher' },
    { title: 'Man Down', artist: 'Rihanna' },
    { title: 'Under The Influence', artist: 'Chris Brown' },
    { title: 'ICU', artist: 'Coco Jones' }

    ]


  ];


// function called when button is clicked
const handleClick = () => {}
const flattenedPlaylist = playlist.flat();
return(

  <div>
    <h1>Library</h1>

    <ul>
    {flattenedPlaylist.map((song, index) => (
        <li key={index}>
          <strong>{song.title}</strong> by {song.artist}
        </li>
      ))}
      </ul>
  <div className="library-playlist">
    <button id="submit" onClick={handleClick}>Add to Playlist</button>
    <button id="submit" onClick={handleClick}>Delete from Playlist</button>

  </div>






  
  </div>

)
}

export default Library;