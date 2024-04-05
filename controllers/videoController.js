const Video = require('../models/Video');
const moment = require('moment');

// Get all videos by cameraId
const getVideosByCameraId = async (req, res) => {
  try {
    const { cameraId } = req.params;
    const videos = await Video.find({ cameraId }).select('videoUrl');
    if (videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for the specified cameraId' });
    }
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error getting videos by cameraId', error: error.message });
  }
};

// Update videos by cameraId
const updateVideosByCameraId = async (req, res) => {
  try {
    const { cameraId } = req.params;
    const updates = req.body;
    const updatedVideos = await Video.updateMany({ cameraId }, updates);
    res.status(200).json({ message: 'Videos updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating videos by cameraId', error: error.message });
  }
};


// Delete videos by cameraId
const deleteVideosByCameraId = async (req, res) => {
  try {
    const { cameraId } = req.params;
    const deletedVideos = await Video.deleteMany({ cameraId });
    if (deletedVideos.deletedCount === 0) {
      return res.status(404).json({ message: 'No videos found for the specified cameraId' });
    }
    res.status(200).json({ message: 'Videos deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting videos by cameraId', error: error.message });
  }
};
// Get all videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('cameraId');
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error getting videos', error: error.message });
  }
};


const getVideosGroupedByCameraId = async (req, res) => {
  try {
    const videos = await Video.aggregate([
      {
        $group: {
          _id: '$cameraId',
          videos: { $push: '$videoUrl' } // Push only the 'videoUrl' field of the matching documents
        }
      }
    ]);

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error getting grouped videos', error: error.message });
  }
};


// Get video by ID
const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error getting video by ID', error: error.message });
  }
};

// Get videos by date
const getVideosByDate = async (req, res) => {
  try {
    const { dateTime } = req.params;
    const videos = await Video.find({ dateTime }).populate('cameraId');
    if (videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for the specified dateTime' });
    }
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error getting videos by date', error: error.message });
  }
};

// Create a new video
const createVideo = async (req, res) => {
  try {
    const { cameraId, duration, videoUrl } = req.body;
    const newVideo = new Video({
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      cameraId,
      duration,
      videoUrl
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating video', error: error.message });
  }
};

// Update video by ID
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVideo = await Video.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating video', error: error.message });
  }
};

// Delete video by ID
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};


module.exports = {  getVideoById, getVideosByCameraId, updateVideosByCameraId, deleteVideosByCameraId, getVideos, getVideosByDate, createVideo, updateVideo, deleteVideo ,getVideosGroupedByCameraId};