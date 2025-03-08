const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const SearchSchema = new Schema({
 // TODO
});

const Search = model('Search', SearchSchema);

module.exports = Search;
