const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const QueueSchema = new Schema(
  {
// TODO : this will basically become a listening history 
  }
);

const Queue = model('Queue', QueueSchema);

module.exports = Queue;
