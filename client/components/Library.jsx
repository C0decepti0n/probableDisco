import React from'react';  
import React, { useState, useEffect } from 'react';
const axios = require('axios');

const Library = (props)=>{
//const []= useState()
const getLibrary = () => {
  axios.get('/library')
  .then(()=>{

  })
  .catch((err)=>{
    console.error(err)
  })
};
const addLibrary= () => {
  axios.post('/library')
  .then(()=>{

  })
  .catch((err)=>{
    console.error(err)
  })
};
const updateLibrary = () => {
  axios.patch('/library')
  .then(()=>{

  })
  .catch((err)=>{
    console.error(err)
  })
};

const deleteLibrary= () => {
  axios.delete('/library')
  .then(()=>{

  })
  .catch((err)=>{
    console.error(err)
  })
};  
// function called when button is clicked
const handleClick = () => {}

return(
  <div className="library-playlist">
    <button id="submit" onClick={handleClick}>Add to Playlist</button>
    <button id="submit" onClick={handleClick}>Delete from Playlist</button>

  </div>
)
}
export default Library;