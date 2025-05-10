const mongoose = require('mongoose');

const surveyReportSchema = new mongoose.Schema({
  missionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mission' },
  duration: Number,
  distance: Number,
  areaCovered: String,
  summary: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SurveyReport', surveyReportSchema);
