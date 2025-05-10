const Mission = require('../models/Mission');

exports.getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find().populate('droneId');
    res.status(200).json(missions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMission = async (req, res) => {
  try {
    const mission = new Mission(req.body);
    await mission.save();
    res.status(201).json(mission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMissionStatus = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(mission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMission = async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
