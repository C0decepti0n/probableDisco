const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define schema for a song inside a playlist
const SongSchema = new Schema({
  name: String,          // Song title
  artist: String,        // Artist name
  album: String,         // Album name
  duration: Number,      // Duration in seconds
  comments: [           // Array of comments for the song
    {
      // Reference to user who commented
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      // The comment text
      text: String,
      // When the comment was added
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

// Define schema for the library (playlist)
const LibrarySchema = new Schema({
  // Owner of the library
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  // Playlist name
  name: String,
  // Array of songs with comments
  songs: [SongSchema]
}, { timestamps: true });

const Library = model("Library", LibrarySchema);
module.exports = Library;

// const mongoose = require('mongoose');

// const { Schema, model } = mongoose;

// // Represents an instance of a Playlist
// const LibrarySchema = new Schema(
//   {
//     // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the library
//     name: String,
//     // TODO : decide if all song data is stored in a playlist or just the corresponding id
//     songs: [
//       {
//         name: String,
//         description: String,
//         tracks: [
//           {
//             trackId: Number,
//             title: String,
//             artist: String, 
//             album: String, 
//             duration: Number,
//           }
//         ],
//       }
//     ],
//   },
//   { timestamps: true }
// );

// const Library = model('Library', LibrarySchema);

// module.exports = Library;
