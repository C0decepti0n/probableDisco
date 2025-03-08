const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const UsersSchema = new Schema({
  // user data
  userId: Number,
  username: String,
  session: String,
  playlists: Array,
  settings: Array,
  listeningHistory: Array,
  commentHistory: Array
});

const Users = model('User', UsersSchema);

module.exports = Users;
