const express = require('express');

// import Avatar db model
const { Avatar } = require('../database/index');

const route = express.Router();

// handle GET requests
route.get('/', (req, res) => {
     // acquire array of settings (avatars) from database
  Avatar.find()
  .then(avatar => {
    // send found array of themes back with status of 200
    res.status(200).send(avatar);
  })
  .catch(err => {
    // handle errors by logging the error and by sending back status of 500
    console.error('Failed to GET avatars from db:', err);
    res.sendStatus(500);
  })

});

// handle POST requests
route.post('/', (req, res) => {
      // insert new (avatar) into the database
  Avatar.create(req.body)
  .then(() => {
    // send status of 201 upon successful creation of the new avatar in the database
    res.sendStatus(201);
  })
  .catch(err => {
    // handle errors by logging the error and by sending back status of 500
    console.error('Failed to POST avatar to db:', err);
    res.sendStatus(500);
  })


});

// handle PATCH requests
route.patch('/:id', (req, res) => {
      // update a avatar in the db by the given id, using the values in the request body as the new value to use 
  Avatar.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    // send status of 200 upon successful alteration of a avatar in the database
    res.sendStatus(200);
  })
  .catch(err => {
    // handle errors by logging the error and by sending back status of 500
    console.error('Failed to PATCH avatar in db:', err);
    res.sendStatus(500);
  })


});

// handle DELETE requests
route.delete('/:id', (req, res) => {
    console.log(req.body.userId);
    
    Avatar.findByIdAndDelete(req.params.id)
    .then(() => {
      // send status of 200 upon successful deletion of a avatar in the database
      res.sendStatus(200);
    })
    .catch(err => {
      // handle errors by logging the error and by sending back status of 500
      console.error('Failed to DELETE theme from db:', err);
      res.sendStatus(500);
    })
});

// export the route for use in server/index.js
module.exports = route;
