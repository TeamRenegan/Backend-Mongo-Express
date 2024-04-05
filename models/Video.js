const mongoose = require('mongoose');
const moment = require('moment');

const videoSchema = new mongoose.Schema({
  dateTime: {
    type: String,
    required: true,
    default: () => moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  cameraId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Camera', 
    required: true,
  },
  duration: { type: Number, required: true },
  videoUrl: { type: String, required: true }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
 