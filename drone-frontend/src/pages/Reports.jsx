import React, { useState, useEffect } from 'react'
import { getAllMissions } from '../services/api'

const Report = () => {
  const [missions, setMissions] = useState([])

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await getAllMissions()
        console.log("Here is the survey mission data================", response.data)
        setMissions(response.data)
      } catch (error) {
        console.error('Error fetching missions:', error)
      }
    }

    fetchMissions()
  }, [])

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-8 text-green-400">📊 Survey Reports</h2>

      {missions.length === 0 ? (
        <p className="text-gray-300">No reports available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <div
              key={mission._id}
              className="bg-[#1e293b] hover:bg-[#334155] transition-all duration-300 border border-green-500 rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-green-300 mb-2">{mission.name}</h3>

              <div className="text-sm mb-2">
                <p>🗺️ Coverage Area: <span className="text-white">{mission.area}</span></p>
                <p>📏 Altitude: <span className="text-white">{mission.altitude} meters</span></p>
              </div>

              <div className="text-sm mb-2">
                <p>🛰️ Status: <span className="text-white">{mission.status}</span></p>
              </div>

              <div className="text-sm mb-2">
                <p>📍 Waypoints:</p>
                <ul className="ml-4 list-disc">
                  {mission.waypoints.map((waypoint, index) => (
                    <li key={index} className="text-white">
                      Lat: {waypoint.lat}, Lng: {waypoint.lng}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Report
