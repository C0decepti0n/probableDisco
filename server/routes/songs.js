const express = require('express');
//const cors = require('cors')
// import Songs db model
const { Songs } = require('../database/index');

const route = express.Router();

// TODO : trigger from search feature in Library Compononent? 
// handle GET requests 
route.get('/', (req, res) => {
  // TODO double check  params is correct
  // const { track } = req.params;
  // mongooose method to find
  Songs.find()
    .then((data)=>{   
      // successful status fetching songs
      res.status(200).send(data)
    })
    .catch((err)=>{
      console.error("Failure to find song:", err)
      // internal service error
      res.sendStatus(500);
    })
});

//* Trigger from button click in Search Component 
// handle POST requests
route.post('/', (req, res) => {
  
  const { song } = req.body
  // mongoose method to create
  Songs.create(req.body)
    .then(()=>{
      
 
      //ok status for successful creation
      console.log('song added')
      res.sendStatus(201);
    })
    .catch((err)=>{
      console.error("Add song failed at server:", err);
      // internal service error
      res.sendStatus(500);
  })
});

// TODO : determine use case 
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

// TODO : trigger from button click in Library Component? 
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