const express = require('express');

// import Library db model
const { Library } = require('../database/index');

const route = express.Router();

// handle GET requests
route.get('/', (req, res) => {
Library.find({})
.then(()=>{
res.send(200).send("Success finding playlist")
})
.catch((err)=>{
  console.error("Failure to find playlist:", err)
  res.sendStatus(500);
})
});

// handle POST requests
route.post('/', (req, res) => {
Library.create()
.then (()=>{

})
.catch((err)=>{
console.error()
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
