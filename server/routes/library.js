const express = require('express');

const { Library } = require('../database/index');

const route = express.Router();

// * Load User Playlists when Library Component renders
route.get('/', (req, res) => { 
// mongooose method to find
Library.find({})
  .then((playlists)=>{
    // id not playlist is found
    if(!playlists){
      // failure status
      res.status(400).send("No playlist found!")
    }
    console.log(playlists)
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
route.post('/', (req, res) => { 
  // mongoose method to create
  Library.create(req.body)
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

//* Update Playlist (rename or delete track)
route.patch('/:id', (req, res) => {
  Library.findByIdAndUpdate(req.params.id, req.body)
  .then((updatedPlaylist)=>{

    if (!updatedPlaylist) {
      return res.status(404).send("Playlist not found in library");
    }
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
route.delete('/:id', (req, res) => { 
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
