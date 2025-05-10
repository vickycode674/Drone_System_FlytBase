const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  speed:{type:Number,required:true},
  altitude: { type: Number, required: true },
  batteryLevel: { type: Number, required: true, min: 0, max: 100 },  // Ensure battery is a required field
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;
