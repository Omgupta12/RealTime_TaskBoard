const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
process.env = require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

let boardState = null;
let onlineUsers = 0;

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Increase user count and notify all clients
    onlineUsers++;
    io.emit('users:count', onlineUsers);

    // Send current board to new user
    if (boardState) {
        socket.emit('board:update', boardState);
    }

    // When someone makes a change, broadcast it
    socket.on('board:changed', (newBoard) => {
        boardState = newBoard;
        socket.broadcast.emit('board:update', newBoard);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Decrease user count and notify all clients
        onlineUsers--;
        io.emit('users:count', onlineUsers);
    });
});


server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
