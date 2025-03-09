const mongoose = require("mongoose");
const Avatar = require("./models/Avatar");
const Comments = require("./models/Comments");
const Library = require("./models/Library");
const Queue = require("./models/Queue");
const Settings = require("./models/Settings");
const Songs = require("./models/Songs");
const Search = require("./models/Search");
const Users = require("./models/Users");
const Sessions = require("./models/Sessions");
const { MONGO_URI } = require("../../config");

// connect to mongo database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✔️ successful db connection");
  })

  .catch((err) => {
    console.log("❌ unsuccessful db connection", err);
  });

module.exports = {
  Avatar,
  Comments,
  Library,
  Queue,
  Settings,
  Songs, 
  Search,
  Users,
  Sessions
};

//mongodb://localhost:27017/slimewire