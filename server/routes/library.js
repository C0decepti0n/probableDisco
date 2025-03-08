const express = require('express');
//const cors = require('cors')
// import Library db model
const { Library } = require('../database/index');

const route = express.Router();

// * Load User Playlists when Library Component renders
// TODO : setState in Library.jsx
route.get('/', (req, res) => { 
// mongooose method to find
Library.find({})
  .then((playlists)=>{
    // id not playlist is found
    if(!playlists){
      // failure status
      res.status(400).send("No playlist found!")
    }
    // successful status fetching playlits
    res.status(200).send(playlists)
  })
  .catch((err)=>{
    console.error("Failure to find playlist:", err)in
    // internal service error
    res.sendStatus(500);
  })
});


//* Create new playlist 
// TODO: decide trigger point(s)
  //* Button at Advanced Search Results
  //* Button at Library Component

route.post('/', (req, res) => { 
  const {playlist} = req.body
  // mongoose method to create
  Library.create(playlist)
    .then(()=>{
      //ok status for successful creation
      res.sendStatus(201);
    })
      .catch((err)=>{
    console.error("Failure to create playlist!:", err);
    // internal service error
    res.sendStatus(500);
    })
});

//* Update Playlist (add song)
// TODO: decide trigger point location (Library Component and/or Advanced Search)
route.patch('/', (req, res) => {x
  Library.findByIdAndUpdate(req.params, req.body)
  .then(()=>{
    //ok sucess status for update
    res.status(200).send("Update was successful!")
  })
  .catch((err)=>{
    console.error("Failure to update playlist!:", err)
    // internal failure error
    res.sendStatus(500);
  })
});

// * Delete Playlist
// TODO : trigger with button in Library Component
route.delete('/', (req, res) => { 
  Library.findByIdAndDelete(req.params.id)
  .then(()=>{
    //ok success status for deletion
    res.status(200).send("Playlist has been deleted!")
  })
  .catch((err)=>{
    console.error("Failure to delete playlist!:", err);
    // internal failure error
    res.sendStatus(500);
  })
});

// export the route for use in server/index.js
module.exports = route;
