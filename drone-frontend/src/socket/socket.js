import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // same as backend

export default socket;
