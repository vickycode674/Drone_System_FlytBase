# 🛰️ Drone Mission Control System

A full-stack web application for drone mission planning, live monitoring, and report generation using **React.js**, **Node.js/Express**, **MongoDB**, and **Socket.IO**.

---

## 📌 Table of Contents

* [🚀 Project Overview](#-project-overview)
* [🛠️ Tech Stack](#-tech-stack)
* [📐 System Architecture](#-system-architecture)
* [📁 Project Structure](#-project-structure)
* [⚙️ API Endpoints](#-api-endpoints)
* [🧪 Testing](#-testing)
* [🚦 App Flow](#-app-flow)
* [🧱 Database Models](#-database-models)
* [▶️ Running the App](#-running-the-app)
* [📸 Screenshots / Diagrams](#-screenshots--diagrams)
* [✅ Tips](#-tips)

---

## 🚀 Project Overview

This system allows operators to:

* 📍 Plan drone missions on an interactive map
* ✈️ Track drone location and mission status in real time
* 📊 Review past missions and generate reports

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* Leaflet.js / Mapbox GL JS
* Socket.IO-client

**Backend:**

* Node.js + Express.js
* MongoDB + Mongoose ODM
* Socket.IO

**Tools:**

* Postman (API Testing)
* TailwindCSS (Optional styling)

---

## 📐 System Architecture

```text
[React Frontend]
   ↑          ↓
[WebSocket Client]
   ↑          ↓
[Node.js + Express Backend]
   ↑          ↓
[Socket.IO Server] <-> [MongoDB]
```

---

## 📁 Project Structure

### Backend

```
├── routes/
│   ├── droneRoutes.js
│   ├── missionRoutes.js
│   └── reportRoutes.js
├── controllers/
│   ├── droneController.js
│   ├── missionController.js
│   └── reportController.js
├── models/
│   ├── Drone.js
│   ├── Mission.js
│   └── Report.js
├── app.js
├── socket.js
```

### Frontend (React)

```
├── components/
│   ├── Dashboard.jsx
│   ├── MissionPlan.jsx
│   ├── LiveMonitor.jsx
│   ├── Reports.jsx
├── App.js
├── socket.js
```

---

## ⚙️ API Endpoints

| Method | Endpoint                  | Description             |
| ------ | ------------------------- | ----------------------- |
| GET    | `/api/drones`             | List all drones         |
| POST   | `/api/mission`            | Create a new mission    |
| GET    | `/api/mission/:id`        | Get mission status      |
| PUT    | `/api/mission/:id/status` | Update mission status   |
| GET    | `/api/reports`            | Get all mission reports |

---

## 🧪 Testing

Use **Postman** to test the following:

* Mission creation payload
* Drone listings
* Live socket events (via frontend)
* Report generation

---

## 🚦 App Flow

1. **Dashboard Page**
   View drone inventory with current battery levels and status.

2. **Mission Planning Page**
   Use Leaflet.js/Mapbox to draw an area, select altitude, and define patterns.

3. **Live Monitoring Page**
   Real-time map showing drone location and mission progress (via Socket.IO).

4. **Reports Page**
   View summaries of past missions with stats like distance, duration, and area coverage.

---

## 🧱 Database Models

### Drone

```json
{
  "_id": "drone123",
  "name": "Drone Alpha",
  "batteryLevel": 75,
  "status": "in-mission",
  "location": { "lat": 12.9, "lng": 77.5 },
  "lastMissionId": "mission001"
}
```

### Mission

```json
{
  "_id": "mission001",
  "droneId": "drone123",
  "status": "in-progress",
  "flightPath": [ { "lat": 12.9, "lng": 77.5 }, ... ],
  "altitude": 100,
  "pattern": "crosshatch",
  "startTime": "...",
  "endTime": "...",
  "progress": 45
}
```

### Report

```json
{
  "_id": "report001",
  "missionId": "mission001",
  "distance": "3km",
  "duration": "20min",
  "coverageArea": "500sq.m",
  "droneUsed": "Drone Alpha"
}
```

---

## ▶️ Running the App

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/drone-control.git
cd drone-control
```

### 2. Backend Setup

```bash
cd backend
npm install
node app.js
```

Make sure MongoDB is running (local or Atlas connection string in `.env`).

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📸 Screenshots / Diagrams

Would you like me to generate and include the following?

* 📊 System Design Diagram
* 🗺️ Leaflet UI Screenshot Sample
* 🔌 WebSocket Interaction Flow
* 🧭 Live Monitoring Page (Mock layout)

Let me know, and I’ll create or fetch visuals to embed here.

---

## ✅ Tips

* Use `setInterval` in backend to simulate mission progress updates.
* Store flight paths as arrays of `{ lat, lng }`.
* Start with minimal UI and scale.
* Use console logs to debug WebSocket connections.
* Save mission settings as JSON for reuse/testing.

---
