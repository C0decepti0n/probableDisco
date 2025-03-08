const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Represents an instance of a Playlist
const LibrarySchema = new Schema(
  {
    // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the library
    name: String,
    // TODO : decide if all song data is stored in a playlist or just the corresponding id
    songs: [
      {
        name: String,
        description: String,
        tracks: [
          {
            trackId: Number,
            title: String,
            artist: String, 
            album: String, 
            duration: Number,
          }
        ],
      }
    ],
  },
  { timestamps: true }
);

const Library = model('Library', LibrarySchema);

module.exports = Library;
