const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

// on: クライアント通信
io.on('connection', (socket) => {
  console.log('Connecting to client.');

  // クライアント受信
  socket.on('send_message', (data) => {
    console.log(data);

    // クライアント送信
    io.emit('received_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Connection with client has been lost.');
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
