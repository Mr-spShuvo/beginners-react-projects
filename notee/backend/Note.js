const mongoose = require('mongoose');

const Note = new mongoose.Schema({
  _id: { type: String },
  data: { type: Object, required: true }
});

module.exports = mongoose.model('note', Note);
