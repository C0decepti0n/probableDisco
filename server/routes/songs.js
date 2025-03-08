const express = require('express');
//const cors = require('cors')
// import Songs db model
const { Songs } = require('../database/index');

const route = express.Router();

// handle GET requests 
route.get('/', (req, res) => {
  // mongooose method to find
  Songs.find({ playlistId: req.params.playlistId })
    .then(()=>{
      
      // successful status fetching songs
    res.status(200).send("Success, found song!")
    })
    .catch((err)=>{
    console.error("Failure to find song:", err)
    // internal service error
    res.sendStatus(500);
    })
});





// handle POST requests
route.post('/', (req, res) => {
  const {song} = req.body
// mongoose method to create
  Songs.create(song)
  .then(()=>{
    //ok status for successful creation
    res.sendStatus(201);
  })
    .catch((err)=>{
  console.error("Failure!:", err);
  // internal service error
  res.sendStatus(500);
  })
});

// handle PATCH requests
route.patch('/', (req, res) => {
  Songs.findByIdAndUpdate(req.params, req.body)

  .then(()=>{
    //ok sucess status for update
  res.status(200).send("Update was successful!")
  })
  .catch((err)=>{
  console.error("Failure to update!:", err)
  // internal failure error
  res.sendStatus(500);
  })
});

// handle DELETE requests
route.delete('/', (req, res) => { 
  Songs.findByIdAndDelete(req.params.id)
  .then(()=>{
      //ok success status for deletion

    res.status(200).send("Song has been deleted!")

  })
  .catch((err)=>{
console.error("Failure to delete song!:", err);
// internal failure error
res.sendStatus(500);
  })

});
module.exports = route;