const mongoose = require('mongoose');
const moment = require('moment');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  date: {
    type: String,
   
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  }
});

module.exports = mongoose.model('Post', postSchema);
