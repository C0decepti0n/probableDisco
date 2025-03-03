const express = require('express');
const path = require('path');

// import routes
const avatarRoute = require('./routes/avatar');
const commentsRoute = require('./routes/comments');
const libraryRoute = require('./routes/library');
const queueRoute = require('./routes/queue');
const settingsRoute = require('./routes/settings');

// create express app
const application = express();
// select port number
const portNum = 3001;

// middleware
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

// serve up static files (react app)
const distPath = path.resolve(__dirname, '../dist');
application.use(express.static(distPath));

// start up the express server using the port number
application.listen(portNum, () => {
  console.log(`Listening on port: ${portNum}`);
});
