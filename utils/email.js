require('dotenv').config(); 

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.pass
  },
});


module.exports = {transporter};

