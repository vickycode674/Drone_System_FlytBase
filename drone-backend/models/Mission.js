const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    droneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drone', required: true },
    area: { type: String, required: true },
    altitude: { type: Number, required: true },
    waypoints: [
      {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    ],
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'completed', 'aborted'],  // Define valid statuses
      required: true 
    }
  });
  
module.exports = mongoose.model('Mission', missionSchema);
