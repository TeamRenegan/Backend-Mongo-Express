const express = require('express');
const app = express();
const cors=require("cors");


// Middleware to parse JSON in requests
// app.use(express.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const cameraRoutes = require('./routes/cameraRoutes');
const videoRoutes = require('./routes/videoRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/users', userRoutes);
app.use('/cameras',cameraRoutes);
app.use('/videos',videoRoutes);
app.use('/posts',postRoutes);

// Export the app
module.exports = app;
