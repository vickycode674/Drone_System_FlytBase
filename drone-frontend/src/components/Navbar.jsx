import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-[#0f172a] text-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider text-cyan-400">🛸 DroneOps</h1>
        <div className="space-x-6 text-lg">
          <Link to="/" className="hover:text-cyan-400 transition">📊 Dashboard</Link>
          <Link to="/plan" className="hover:text-cyan-400 transition">🗺️ Plan Mission</Link>
          <Link to="/monitor" className="hover:text-cyan-400 transition">📡 Monitor</Link>
          <Link to="/reports" className="hover:text-cyan-400 transition">📁 Reports</Link>
          <Link to="/flight-path-config" className="hover:text-cyan-400 transition">
            Flight Path Configurator
          </Link>
          <Link to="/drone" className="hover:text-cyan-400 transition"> Drone</Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
