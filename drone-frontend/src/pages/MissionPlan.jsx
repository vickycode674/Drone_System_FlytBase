import React, { useState, useEffect } from 'react'
import { createMission, getAllDrones } from '../services/api'

const MissionPlan = () => {
  const [missionData, setMissionData] = useState({
    name: '',
    droneId: '',
    area: '',
    altitude: '',
    status: 'pending',
    waypoints: [{ lat: '', lng: '' }]
  })

  const [drones, setDrones] = useState([])

  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await getAllDrones()
        setDrones(response.data)
      } catch (error) {
        console.error('Error fetching drones:', error)
      }
    }
    fetchDrones()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMissionData((prev) => ({ ...prev, [name]: value }))
  }

  const handleWaypointChange = (e) => {
    const { name, value } = e.target
    setMissionData((prev) => ({
      ...prev,
      waypoints: [{ ...prev.waypoints[0], [name]: value }]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formattedData = {
        ...missionData,
        altitude: parseFloat(missionData.altitude),
        waypoints: [
          {
            lat: parseFloat(missionData.waypoints[0].lat),
            lng: parseFloat(missionData.waypoints[0].lng)
          }
        ]
      }

      await createMission(formattedData)
      alert('✅ Mission created successfully!')

      // Reset form
      setMissionData({
        name: '',
        droneId: '',
        area: '',
        altitude: '',
        status: 'pending',
        waypoints: [{ lat: '', lng: '' }]
      })
    } catch (error) {
      console.error('Error:', error)
      alert('❌ Error creating mission')
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-8 text-cyan-400">🗺️ Plan a New Mission</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-8 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-6"
      >
        <div>
          <label className="block text-sm mb-1">Mission Name</label>
          <input
            type="text"
            name="name"
            value={missionData.name}
            onChange={handleInputChange}
            placeholder="Enter mission name"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Drone</label>
          <select
            name="droneId"
            value={missionData.droneId}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          >
            <option value="">Select a Drone</option>
            {drones.map((drone) => (
              <option key={drone._id} value={drone._id}>
                {drone.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Area</label>
          <input
            type="text"
            name="area"
            value={missionData.area}
            onChange={handleInputChange}
            placeholder="Enter Area"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Altitude (in meters)</label>
          <input
            type="number"
            name="altitude"
            value={missionData.altitude}
            onChange={handleInputChange}
            placeholder="Enter Altitude"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            name="status"
            value={missionData.status}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
            <option value="aborted">Aborted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Waypoint Latitude</label>
          <input
            type="number"
            name="lat"
            value={missionData.waypoints[0].lat}
            onChange={handleWaypointChange}
            placeholder="Latitude"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Waypoint Longitude</label>
          <input
            type="number"
            name="lng"
            value={missionData.waypoints[0].lng}
            onChange={handleWaypointChange}
            placeholder="Longitude"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition duration-200"
        >
          🚀 Create Mission
        </button>
      </form>
    </div>
  )
}

export default MissionPlan
