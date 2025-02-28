const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const AvatarSchema = new Schema({
  // active image idle image user id
  idleImage: String,
  activeImage: String,
  userId: Number,
});

const Avatar = model('Avatar', AvatarSchema);

module.exports = Avatar;
