import { io } from 'socket.io-client';

const socket = io('https://realtime-taskboard-backend.onrender.com/');

export default socket;
