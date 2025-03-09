const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// Represents an instance of a Playlist
const LibrarySchema = new Schema(
  {
  
  'name': String,
      'tracks': {
          'data': [
                  {
                  'trackId': Number,
          'title': String,
          'link': String,
          'preview': String,
          'artist': { 'name': String, 'id': Number},
          'album': { 'title': String, 'id': Number },
                  }
              ]
          }
        } 




  
    // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Owner of the library
  //   name: String,
  //   // TODO : decide if all song data is stored in a playlist or just the corresponding id
  //   songs: [
  //     {
  //   'trackId': Number,
  //  'title': String,
  //  'link': String,
  //  'preview': String,
  //  'artist': { 'name': String, 'id': Number },
  //  'album': { 'title': String, 'id': Number }, 
  //     }
  //   ],
  // },
  // { timestamps: true }
);

const Library = model('Library', LibrarySchema);

module.exports = Library;
