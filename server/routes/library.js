const express = require('express');
const axios = require('axios');

// import Library db model
const { Library } = require('../database/index');


const route = express.Router();

// handle GET requests for search
route.get('/search', (req, res) => {
  //destructure query from query parameters
  const { query } = req.query;
  //if no query is provided
  if (!query) {
    // returns a bad request 
    return res.status(400).send ({ error: "Query is required" });
}

// sends  a get request to fetch data from deezer
axios.get(`https://api.deezer.com/search?q=${query}`)
.then((response) => {
  // succesful ok status with list of songs(tracks)
    res.status(200).send(response.data)
})
// error for bugs
.catch((err) => {
  console.error("Failure to find query:", err)
 // server error 
    res.sendStatus(500);
});
});


//fetch information about artist by id on deezer


// handle GET requests for search
  route.get('/artist', (req, res) => {
    //destructure query from query parameters
    const { name } = req.query;
    //if no query is provided
    if (!name) {
      // returns a bad request 
      return res.status(400).send ({ error: "Name is required" });
  }

  // sends  a get request to fetch data from deezer
  axios.get(`https://api.deezer.com/search/artist?q=${name}`)
  .then((response) => {
    // succesful ok status for artist with name 
      res.status(200).send(response.data)
  })
  // error for bugs
  .catch((err) => {
    console.error("Failure to find name:", err)
  // server error 
      res.sendStatus(500);
  });
  });

// handle GET requests for search by track 
route.get('/track', (req, res) => {
  //destructure query from query parameters
  const { track } = req.query;
  //if no query is provided
  if (!track) {
    // returns a bad request for not found
    return res.status(400).send ({ error: "Name is required" });
}

// sends  a get request to fetch data from deezer
axios.get(`https://api.deezer.com/search/track?q=${title}`)
.then((response) => {
  // succesful ok status for track by name 
    res.status(200).send(response.data)
})
// error for bugs
.catch((err) => {
  console.error("Failure to find track:", err)
// server error 
    res.sendStatus(500);
});
});





route.get('/', async (req, res) => {
  Library.find()
  .then((playlists)=>{
    console.log("Retrieved playlists:", playlists);  // Log to check the data

    res.status(200).send(playlists);
  })
   .catch ((err)=> {
      console.error("Error retrieving playlists:", err);
      res.sendStatus(500);
});
})



// handle POST requests to create library
route.post('/', (req, res) => {
//dectructure parameter from req.body

const {name, tracks, description } = req.body
console.log("Received Data:", req.body);  // Debugging


Library.create({name, tracks, description})
.then (()=>{
  res.sendStatus(201);

})
.catch((err)=>{
console.error("Failure to create playlist:", err);
res.sendStatus(500)
})
});










// handle PATCH requests
route.patch('/', (req, res) => {

});

// handle DELETE requests
route.delete('/', (req, res) => {

});

// export the route for use in server/index.js
module.exports = route;
