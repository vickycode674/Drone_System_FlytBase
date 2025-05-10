import React, { useState } from 'react'
import { createDrone } from '../services/api'

const Drone = () => {

    const [ droneData,setDroneData] = useState({
        name:'',
        status: 'Pending',
        batteryLevel: '',
        altitude:'',
        speed:'',
       location: { lat: '', lng: '' },
    })

      const handleInputChange = (e) => {
    const { name, value } = e.target
    setDroneData((prev) => ({ ...prev, [name]: value }))
  }

   const handleWaypointChange = (e) => {
    const { name, value } = e.target
    setDroneData((prev) => ({
      ...prev,
    location: { ...prev.location, [name]: value }
    }))
  }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const formattedData = {
            ...droneData,
            location: {
  lat: parseFloat(droneData.location.lat),
  lng: parseFloat(droneData.location.lng)
}
          }
          console.log("here is the formated data for ======",formattedData)
    
          await createDrone(formattedData)
          alert('✅ Drone created successfully!')
    
          // Reset form
          setDroneData({
        name:'',
        status: 'Pending',
        batteryLevel: '',
        speed:'',
        location: [{lat:'',lng:''}],
        altitude:'',
          })
        } catch (error) {
          console.error('Error:', error)
          alert('❌ Error creating mission')
        }
      }
  return (
        <div className="min-h-screen bg-[#0f172a] text-white py-10 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-8 text-cyan-400">🗺️ Plan a New Drone</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-8 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-6"
      >
        <div>
          <label className="block text-sm mb-1">Drone Name</label>
          <input
            type="text"
            name="name"
            value={droneData.name}
            onChange={handleInputChange}
            placeholder="Enter Drone name"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>


        <div>
          <label className="block text-sm mb-1">Battery Level</label>
          <input
            type="number"
            name="batteryLevel"
            value={droneData.batteryLevel}
            onChange={handleInputChange}
            placeholder="Enter Batterly Level"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

         <div>
          <label className="block text-sm mb-1">Speed kmph</label>
          <input
            type="number"
            name="speed"
            value={droneData.speed}
            onChange={handleInputChange}
            placeholder="Enter Batterly Level"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Altitude meteres</label>
          <input
            type="number"
            name="altitude"
            value={droneData.altitude}
            onChange={handleInputChange}
            placeholder="Enter Altitude Level"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>


        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            name="status"
            value={droneData.status}
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
          <label className="block text-sm mb-1">Location Lattitude</label>
          <input
            type="number"
            name="lat"
            value={droneData.location?.lat || ''}
            onChange={handleWaypointChange}
            placeholder="Latitude"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Location Longitude</label>
          <input
            type="number"
            name="lng"
            value={droneData.location?.lng || ''}
            onChange={handleWaypointChange}
            placeholder="Longitude"
            className="w-full p-3 rounded bg-[#0f172a] text-white border border-cyan-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg transition duration-200"
        >
          🚀 Create Drone
        </button>
      </form>
    </div>
  )
}

export default Drone