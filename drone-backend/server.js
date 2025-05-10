const dotenv = require('dotenv');
const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./config/db');



dotenv.config();
connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);
  
    socket.on('missionUpdate', (data) => {
      // Broadcast to all other clients
      socket.broadcast.emit('missionStatusChanged', data);
    });
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  const PORT = process.env.PORT || 5000; // Use environment variable or default

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

  