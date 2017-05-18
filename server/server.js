const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, isOriginalName} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    function matchingNames (name, namesArray) {
      return namesArray.filter((itemName) => itemName === name );
    };

    var room = params.room.toLowerCase();

    var namesArray = users.getUserList(room);
    var sameNamesArray = matchingNames(params.name, namesArray);

    if (sameNamesArray.length > 0) {
      return callback('Username already taken.  Please be more original');
    }


    socket.join(room);
    
    users.removeUser(socket.id);

    users.addUser(socket.id, params.name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));

    // socket.leave(params.room);
    // io.to(params.room).emit
    // socket.brodcast.to(params.room).emit
    // socket.emit

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocation', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
