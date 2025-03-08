const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const SessionsSchema = new Schema({
 sessionId: String,
 cookies: Array,
 // foreign key
 userId: String,
 // foreign key - Listening history for a given session
 queueId: String
});

const Sessions = model('Session', SessionsSchema);

module.exports = Sessions;
 