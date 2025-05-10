const SurveyReport = require('../models/SurveyReport');

exports.getAllReports = async (req, res) => {
  try {
    const reports = await SurveyReport.find().populate('missionId');
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const report = new SurveyReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
