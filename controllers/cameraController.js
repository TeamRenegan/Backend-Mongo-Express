const Camera = require('../models/Camera');
const{  transporter }= require('../utils/email');
const nodemailer = require('nodemailer');
const fs = require('fs').promises; // Import the fs module
const path = require('path'); // Import the path module

const addCamera = async (req, res) => {
  try {
    // Add email to the destructuring assignment from req.body


    const { cameraId,ownerName, contactNumber, address, latitude, longitude, cameraModel, streamingUrl, cameraDirection, email } = req.body;
    const camera = new Camera({
      cameraId,
      ownerName,
      contactNumber,
      address,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      cameraModel,
      streamingUrl,
      cameraDirection,
      email // Include the email when creating a new Camera
    });
    await camera.save();
    await sendRegistrationEmail(email, ownerName);
    res.status(201).send(camera);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const sendRegistrationEmail = async (email, ownerName) => {
  try {
    // Read the HTML template from the file
    const templatePath = path.join(__dirname, '../utils/mailTemplates/registerSuccess.html');
    let htmlTemplate = await fs.readFile(templatePath, 'utf8');

    // Replace the placeholder with the owner's name
    htmlTemplate = htmlTemplate.replace('[User]', ownerName);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Renegan - Registration Success',
      html: htmlTemplate // Use the HTML content from the template file
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Registration success email sent to ${email}`);
  } catch (error) {
    console.error('Error sending registration email:', error);
  }
};

// No changes needed here as we're not directly dealing with the camera creation or update
const getAllCameras = async (req, res) => {
  try {
    const cameras = await Camera.find({});
    res.send(cameras);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getCameraById = async (req, res) => {
  try {
    const { id } = req.params;
    const camera = await Camera.findById(id);
    if (!camera) {
      return res.status(404).send({ error: 'Camera not found' });
    }
    res.send(camera);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// This function may need attention if email is a field that users can update
const updateCamera = async (req, res) => {
  try {
    const { id } = req.params;
    // It might be a good idea to ensure email format is validated on update as well, depending on your use case
    const updates = req.body;
    const updatedCamera = await Camera.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedCamera) {
      return res.status(404).send({ error: 'Camera not found' });
    }
    res.send(updatedCamera);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteCamera = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCamera = await Camera.findByIdAndDelete(id);
    if (!deletedCamera) {
      return res.status(404).send({ error: 'Camera not found' });
    }
    res.send({ message: 'Camera deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getCameraByCameraId = async (req, res) => {
  try {
    const { cameraId } = req.params;
    const camera = await Camera.findOne({ cameraId });
    if (!camera) {
      return res.status(404).send({ error: 'Camera not found' });
    }
    res.send(camera);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updateCameraByCameraId = async (req, res) => {
  try {
    const { cameraId } = req.params;
    const updates = req.body;
    const updatedCamera = await Camera.findOneAndUpdate({ cameraId }, updates, { new: true });
    if (!updatedCamera) {
      return res.status(404).send({ error: 'Camera not found' });
    }
    res.send(updatedCamera);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteCameraByCameraId = async (req, res) => {
  try {
    const { cameraId } = req.params;
    const deletedCamera = await Camera.findOneAndDelete({ cameraId });
    if (!deletedCamera) {
      return res.status(404).send({ error: 'Camera not found' });
    }
    res.send({ message: 'Camera deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getCameraDetailsByCameraId = async (req, res) => {
  try {
    const { cameraId } = req.params;
    const camera = await Camera.findOne({ cameraId }, 'ownerName contactNumber email address cameraModel -_id');
    if (!camera) {
      return res.status(404).send({ error: 'Camera not found' });
    }
    res.send(camera);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};


const getNearbyCameras = async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      const radius = 1000; // Adjust the radius as needed
  
      const cameras = await Camera.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            $maxDistance: radius
          }
        }
      });
  
      res.send(cameras);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getCameraDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const camera = await Camera.findById(id, 'ownerName contactNumber email address cameraModel -_id');
    if (!camera) {
      return res.status(404).send({ error: 'Camera not found' });
    }
    res.send(camera);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = { addCamera, getAllCameras, getCameraById, updateCamera, deleteCamera, getNearbyCameras ,getCameraDetailsById,getCameraByCameraId,updateCameraByCameraId,deleteCameraByCameraId,getCameraDetailsByCameraId};
