const express = require('express');
const router = express.Router();
const {
  getVideos,
  getVideoById,
  getVideosByCameraId,
  updateVideosByCameraId,
  deleteVideosByCameraId,
  getVideosByDate,
  createVideo,
  updateVideo,
  deleteVideo,
  getVideosGroupedByCameraId
} = require('../controllers/videoController');

// Get all videos
router.get('/', getVideos);

router.get('/grouped', getVideosGroupedByCameraId);

// Get video by ID
router.get('/:id', getVideoById);

// Get all videos by cameraId
router.get('/camera/:cameraId', getVideosByCameraId);

// Update videos by cameraId
router.put('/camera/:cameraId', updateVideosByCameraId);

// Delete videos by cameraId
router.delete('/camera/:cameraId', deleteVideosByCameraId);

// Get videos by date
router.get('/date/:dateTime', getVideosByDate);

// Create a new video
router.post('/', createVideo);

// Update video by ID
router.put('/:id', updateVideo);

// Delete video by ID
router.delete('/:id', deleteVideo);



module.exports = router;
