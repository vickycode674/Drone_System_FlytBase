import React, { useState, useEffect } from 'react'
import { getAllMissions } from '../services/api'
import { FaSatellite, FaMapMarkedAlt, FaStopwatch } from 'react-icons/fa'
import { MdOutlineGpsFixed } from 'react-icons/md'

const LiveMonitor = () => {
  const [missions, setMissions] = useState([])

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await getAllMissions()
        console.log("Here is the response=================", response.data)
        setMissions(response.data)
      } catch (error) {
        console.error('Error fetching missions:', error)
      }
    }

    fetchMissions()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500'
      case 'in-progress':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-green-500'
      case 'aborted':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-3 text-cyan-400">
        <FaSatellite className="animate-pulse" />
        Live Mission Monitor
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {missions.map((mission) => (
          <div
            key={mission._id}
            className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/40 transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-white flex items-center gap-2">
                <MdOutlineGpsFixed className="text-orange-400 text-xl" />
                <span className="text-cyan-300">Mission:</span>
                <span className="text-orange-300 font-bold">{mission.name}</span>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(mission.status)}`}>
                {mission.status}
              </span>
            </div>

            <p className="mb-2 flex items-center">
              <FaStopwatch className="inline-block text-yellow-400 mr-2" />
              <span className="text-white">Area:</span>
              <span className="ml-1 text-orange-200">{mission.area}</span>
            </p>

            <p className="mb-2 flex items-center">
              <FaMapMarkedAlt className="inline-block text-green-400 mr-2" />
              <span className="text-white">Altitude:</span>
              <span className="ml-1 text-green-300">{mission.altitude} m</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveMonitor
