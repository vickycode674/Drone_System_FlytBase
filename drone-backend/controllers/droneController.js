const Drone = require('../models/Drone');

// GET all drones
exports.getAllDrones = async (req, res) => {
  try {
    console.log("Welcme to get your drone==============")
    const drones = await Drone.find();
    console.log("here is the drone data============",drones)
    res.status(200).json(drones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a drone
exports.createDrone = async (req, res) => {
    try {
      const drone = new Drone(req.body);
      await drone.save();
      res.status(201).json(drone);
    } catch (err) {
      console.error(err);  // Log error for debugging
      res.status(400).json({ error: err.message });
    }
  };
  

// UPDATE drone status or info
exports.updateDrone = async (req, res) => {
  try {
    const drone = await Drone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(drone);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// In your backend controller or service
// io.emit('drone:update', updatedDrone);


// DELETE drone
exports.deleteDrone = async (req, res) => {
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
