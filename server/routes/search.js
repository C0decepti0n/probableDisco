const express = require('express');

// import Search db model
const { Search } = require('../database/index');

const route = express.Router();

// handle GET requests
route.get('/', (req, res) => {

});

// handle POST requests
route.post('/', (req, res) => {

});

// handle PATCH requests
route.patch('/', (req, res) => {

});

// handle DELETE requests
route.delete('/', (req, res) => {

});

// export the route for use in server/index.js
module.exports = route;
