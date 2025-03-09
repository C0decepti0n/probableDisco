const mongoose = require('mongoose');

const { Schema, model } = mongoose;
//TODO middleware
///// TODO : this will basically become a listening history ?
//* Playback Engine with the OEmbedData
const QueueSchema = new Schema( // aka OEmbedModel
  {
    id: Number, // from Deezer 
    provider_name: String, // probs 'Deezer'
    provider_url: String, // probs 'https://www.deezer.com'
    entity: String, // what deezer calls type here ('track', 'album', 'playlist', TODO are there more? )
    url: String, 
    title: String,

  }
);

const Queue = model('Queue', QueueSchema);

module.exports = Queue;
