const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const SongsSchema = new Schema(
  {
   'trackId': Number,
   'title': String,
   'link': String,
   'preview': String,
   'artist': { 'name': String, 'id': Number },
   'album': { 'title': String, 'id': Number },
  }
);

const Songs = model('Song', SongsSchema);

module.exports = Songs;