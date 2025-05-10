const express = require('express')
const cors = require('cors')
const app = express();


app.use(cors());
app.use(express.json());

const droneRoutes = require('./routes/droneRoutes');
const missionRoutes = require('./routes/missionRoutes');
const reportRoutes = require('./routes/reportRoutes');

app.use('/api/drones', droneRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/reports', reportRoutes);


module.exports = app;
