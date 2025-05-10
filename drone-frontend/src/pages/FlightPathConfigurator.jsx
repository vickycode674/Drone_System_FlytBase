import React, { useState, useEffect } from 'react';
import 'animate.css';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getAllDrones, createMission } from '../services/api';
import 'animate.css';

// Fix Leaflet icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const FlightPathConfigurator = () => {
  const [waypoints, setWaypoints] = useState([]);
  const [altitude, setAltitude] = useState(100);
  const [missionName, setMissionName] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('pending');
  const [drones, setDrones] = useState([]);
  const [selectedDroneId, setSelectedDroneId] = useState('');

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await getAllDrones();
        setDrones(response.data);
      } catch (error) {
        console.error('Failed to fetch drones:', error);
      }
    };
    fetchDrones();
  }, []);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setWaypoints((prev) => [...prev, { lat, lng }]);
      },
    });
    return null;
  }

  const handleSaveMission = async () => {
    if (!missionName || !area || !selectedDroneId || !status) {
      alert('❌ Please fill all required fields.');
      return;
    }

    const missionData = {
      name: missionName,
      area,
      droneId: selectedDroneId,
      status,
      altitude,
      waypoints,
      created_at: new Date().toISOString(),
    };

    try {
      await createMission(missionData);
      alert('✅ Mission saved successfully!');
      setMissionName('');
      setWaypoints([]);
      setArea('');
      setAltitude(100);
      setStatus('pending');
      setSelectedDroneId('');
    } catch (error) {
      console.error('Error saving mission:', error);
      alert('⚠️ Failed to save mission.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 py-10 px-6 text-white font-sans">
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-pink-300 animate__animated animate__fadeInDown">
          🛩️ Drone Flight Path Configurator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">📛 Mission Name</label>
            <input
              type="text"
              value={missionName}
              onChange={(e) => setMissionName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="e.g., Survey Route A"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">📍 Area</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="e.g., Chennai, TN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">🛰️ Select Drone</label>
            <select
              value={selectedDroneId}
              onChange={(e) => setSelectedDroneId(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/20 text-black border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Select Drone --</option>
              {drones.map((drone) => (
                <option key={drone._id} value={drone._id}>
                  {drone.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">🚦 Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">🛫 Altitude (meters)</label>
            <input
              type="number"
              min="1"
              value={altitude}
              onChange={(e) => setAltitude(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>

        <div className="mt-6 rounded-lg overflow-hidden border-2 border-indigo-300 shadow-lg">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MapClickHandler />
            {waypoints.map((wp, i) => (
              <Marker key={i} position={[wp.lat, wp.lng]}>
                <Popup>Waypoint {i + 1}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <button
          onClick={handleSaveMission}
          className="mt-6 w-full py-3 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 rounded-md shadow-md hover:scale-105"
        >
          💾 Save Flight Mission
        </button>

        <p className="text-sm text-gray-300 mt-4 text-center">
          📌 Click on the map to mark waypoints. Fill out mission details, and press Save to store it.
        </p>
      </div>
    </div>
  );
};

export default FlightPathConfigurator;
