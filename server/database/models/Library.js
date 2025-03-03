const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const LibrarySchema = new Schema({
  name: String,
  description: String,
  tracks: String,
  title: String,
});

const Library = model("Library", LibrarySchema);

module.exports = Library;
