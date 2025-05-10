import React, { useEffect, useState } from 'react';
import { getAllDrones } from '../services/api';
import socket from '../socket/socket'; // 👈 Make sure this points to your socket file

const Dashboard = () => {
  const [drones, setDrones] = useState([]);

  // Initial fetch
  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await getAllDrones();
        setDrones(response.data);
      } catch (error) {
        console.error('Error fetching drones:', error);
      }
    };

    fetchDrones();
  }, []);

  // Real-time updates via socket.io
  useEffect(() => {
    const handleDroneUpdate = (updatedDrone) => {
      setDrones((prevDrones) =>
        prevDrones.map((drone) =>
          drone._id === updatedDrone._id ? updatedDrone : drone
        )
      );
    };

    socket.on('drone:update', handleDroneUpdate);

    return () => {
      socket.off('drone:update', handleDroneUpdate);
    };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'aborted':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-600 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-white">
        <h2 className="text-5xl font-extrabold text-center  mb-8 animate__animated animate__fadeInUp">
          🚁 Drone Status Dashboard 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drones.map((drone) => (
            <div
              key={drone._id}
              className="bg-black bg-opacity-70 hover:bg-opacity-80 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="mb-4 text-center">
                <h3 className="text-2xl font-bold text-blue-200">{drone.name}</h3>
                <p className={`text-lg font-semibold ${getStatusColor(drone.status)} px-3 py-1 rounded inline-block`}>
                  {drone.status.toUpperCase()} 🚀
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">Battery: <span className="font-medium text-yellow-300">{drone.batteryLevel}% 🔋</span></p>
                <p className="text-sm">Altitude: <span className="font-medium text-indigo-200">{drone.altitude || 'N/A'}m 🏞️</span></p>
                <p className="text-sm">Speed: <span className="font-medium text-teal-200">{drone.speed || 'N/A'} km/h 🚗</span></p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-lg">Location Details 🗺️:</h4>
                <div className="text-sm">Latitude: <span className="text-teal-100">{drone.location?.lat || 'N/A'}</span></div>
                <div className="text-sm">Longitude: <span className="text-teal-100">{drone.location?.lng || 'N/A'}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
