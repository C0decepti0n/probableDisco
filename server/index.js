const express = require('express');
const session = require('express-session');
const path = require('path');

const passport = require('passport');
const avatarRoute = require("./routes/avatar");
const commentsRoute = require("./routes/comments");
const libraryRoute = require("./routes/library");
const queueRoute = require("./routes/queue");
const settingsRoute = require("./routes/settings");
const songsRoute = require("./routes/songs");
const searchRoute = require("./routes/search");
const usersRoute = require("./routes/users");
const sessionsRoute = require("./routes/sessions");

// create express app
const app = express();

// Express session setup
app.use(session({ secret: "cats", resave:false, saveUnitialized: true })); // SWITCH TO ENV VARIABLE??
app.use(passport.initialize());
app.use(passport.session());

// React build path
const distPath = path.resolve(__dirname, "../dist");

// Google auth setup
require('../auth.js');

// helper to check if user is logged in
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
// Auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/failure', (req, res) => {
  res.send('something went wrong...');
});

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
  }
});

app.get('/home', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to logout');
    }
    res.redirect('/')
  })
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
// serve up static files (react app)
app.use(express.static(distPath));

// link routers to express server
app.use("/avatar", avatarRoute);
app.use("/comments", commentsRoute);
app.use("/library", libraryRoute);
app.use("/queue", queueRoute);
app.use("/settings", settingsRoute);
app.use("/songs", songsRoute);
app.use("/search", searchRoute);
app.use("/users", usersRoute);
app.use("/sessions", sessionsRoute);

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// start up the express server using the port number
const portNum = 3000;
app.listen(portNum, () => {
  console.log(`Listening on port: ${portNum}`);
});
