import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MissionPlan from './pages/MissionPlan';
import LiveMonitor from './pages/LiveMonitor';
import Reports from './pages/Reports';
import Navbar from './components/Navbar'; // import navbar
import FlightPathConfigurator from './pages/FlightPathConfigurator';
import Drone from './pages/Drone';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Add navbar here */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/plan" element={<MissionPlan />} />
        <Route path="/monitor" element={<LiveMonitor />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/flight-path-config" element={<FlightPathConfigurator />} />
        <Route path="/drone" element={<Drone />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
