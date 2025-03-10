const express = require('express');

// import Settings db model
const { Settings } = require('../database/index');
// create router
const route = express.Router();

/////LOOOK AT MEEEEE
// create reference to default values (similar to global "light mode" theme)
const defaultRef = {
    themeName: 'unnamed',
    primaryColor: 'black',
    secondaryColor: 'white',
    tertiaryColor: 'green',
    cursor: 'auto',
    font: 'serif',
    borderRadius: 0,
    userId: 0,
}

/////LOOOK AT MEEEEE
// // may be eventually used to correct inputted theme values
// const themeCorrecter = (newTheme) => {

// }

// handle GET requests
route.get('/', (req, res) => {
  // acquire array of settings (themes) from database
  Settings.find()
    .then(themes => {
      // send found array of themes back with status of 200
      res.status(200).send(themes);
    })
    .catch(err => {
      // handle errors by logging the error and by sending back status of 500
      console.error('Failed to GET themes from db:', err);
      res.sendStatus(500);
    })
});

// handle POST requests
route.post('/', (req, res) => {
  // replace empty fields with default values (not necessary but cleans things up a little)
  // create an empty array that will eventually be used to add a new theme to the db
  const valuesToAdd = {};
  // loop through the req.body object
  for (let key in req.body) {
    // for each key/value pair in req.body, give valuesToAdd a copy of the same key/value pair as long as the value isn't an empty string
    if (req.body[key] !== '') {
      valuesToAdd[key] = req.body[key];
    } else { // if the value is an empty string, then give the current key the default value from defaultRef
      valuesToAdd[key] = defaultRef[key];
    }
  }
  // insert new setting (theme) into the database
  Settings.create(valuesToAdd)
    .then(() => {
      // send status of 201 upon successful creation of the new theme in the settings database
      res.sendStatus(201);
    })
    .catch(err => {
      // handle errors by logging the error and by sending back status of 500
      console.error('Failed to POST theme to db:', err);
      res.sendStatus(500);
    })
});

// handle PATCH requests
route.patch('/:id', (req, res) => {
  // update a theme in the db by the given id, using the values in the request body as the new value to use in the theme
  Settings.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      // send status of 200 upon successful alteration of a theme in the settings database
      res.sendStatus(200);
    })
    .catch(err => {
      // handle errors by logging the error and by sending back status of 500
      console.error('Failed to PATCH theme in db:', err);
      res.sendStatus(500);
    })
});

// handle DELETE requests
route.delete('/:id', (req, res) => {
  /////LOOOK AT MEEEEE
  console.log(req.body.userId);
  // // refuse requests that try to delete requests with a userId of 0 (global themes set by admins) by sending a status of 403 (forbidden)
  // if (req.body.userId === 0) {
  //   res.sendStatus(403);
  //   // ALT
  //   res.status(200).send('global value not effected');
  // } else {
    // delete a theme in the db by the given id
    Settings.findByIdAndDelete(req.params.id)
      .then(() => {
        // send status of 200 upon successful deletion of a theme in the settings database
        res.sendStatus(200);
      })
      .catch(err => {
        // handle errors by logging the error and by sending back status of 500
        console.error('Failed to DELETE theme from db:', err);
        res.sendStatus(500);
      })
  // }
});

// export the route for use in server/index.js
module.exports = route;
