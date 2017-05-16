const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  //EMIT first, from, text, createdAt
  socket.emit('newMessage', {from: 'tony@ex.com', text: 'whatup bish', createdAt: 1235323455663234});

  //LISTEN next // from, text
  socket.on('createMessage', (message) => {
    console.log('createdMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
