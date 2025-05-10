import axios from 'axios';

// Set up Axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example GET request function (adjust as per the required route)
export const getAllDrones = () => api.get('/drones');
export const getAllMissions = () => api.get('/missions');
export const createDrone = (droneData) => api.post('/drones', droneData);
export const createMission = (missionData) => api.post('/missions', missionData);
