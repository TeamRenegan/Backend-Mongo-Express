const Video = require('../models/Video');
const moment = require('moment');
const Camera = require('../models/Camera');
const{  transporter }= require('../utils/email');
const nodemailer = require('nodemailer');
const fs = require('fs').promises; // Import the fs module
const path = require('path'); // Import the path module

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

    const camera = await Camera.findOne({ _id: cameraId });
    if (!camera) {
      return res.status(404).json({ message: 'Camera not found' });
    }

    


    const newVideo = new Video({
      dateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      cameraId,
      duration,
      videoUrl
    });

    

    const savedVideo = await newVideo.save();

    await sendEmail(camera.email,camera.ownerName,videoUrl);

    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating video', error: error.message });
  }
};

// method for sending mail to owner upon criminal video upload

const sendCrimeMail = async(req,res)=>{
  const email = 'gopalsaraf02@gmail.com';
  const ownerName = 'Gopal Saraf';
  const videoUrl = 'https://ankit-s3-1.s3.ap-south-1.amazonaws.com/crime_scenes/live_stream.mp4';

  sendEmail(email,ownerName,videoUrl);
  console.log('Mail sent to Gopal Saraf');
  
res.status(201).json({message: 'Mail sent to Gopal Saraf'})

}
const sendEmail = async (email, ownerName,videoUrl) => {
  try {
    // Read the HTML template from the file
    const templatePath = path.join(__dirname, '../utils/mailTemplates/videoUploadOwner.html');
let htmlTemplate = await fs.readFile(templatePath, 'utf8');

htmlTemplate = htmlTemplate.replace('[User]', ownerName).replace('[VideoLink]', videoUrl);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Crime Scene Video Uploaded',
      html: htmlTemplate // Use the HTML content from the template file
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Crime Scene email sent to ${email}`);
  } catch (error) {
    console.error('Error sending crime scene:', error);
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


module.exports = {  getVideoById, getVideosByCameraId, updateVideosByCameraId, deleteVideosByCameraId, getVideos, getVideosByDate, createVideo, updateVideo, deleteVideo ,getVideosGroupedByCameraId , sendCrimeMail};