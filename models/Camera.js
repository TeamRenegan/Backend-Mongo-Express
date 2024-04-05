const mongoose = require('mongoose');

const cameraSchema = new mongoose.Schema({
  cameraId: { type: String, required: true },
  ownerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true, 
      validate: {
        validator: function(value) {
          if (value.length !== 2) return false;
          const [latitude, longitude] = value;
          return (
            typeof latitude === 'number' &&
            typeof longitude === 'number'
          );
        },
        message: 'Invalid coordinates'
      }
    }
  },
  cameraModel: { type: String, required: true },
  streamingUrl: { type: String, required: true },
  cameraDirection: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
});

cameraSchema.index({ location: '2dsphere' });

const Camera = mongoose.model('Camera', cameraSchema);

module.exports = Camera;
