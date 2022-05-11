const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', function(socket){
  const users = [
    {
      name: "Divya",
      online: true
    },
    {
      name: "Komal",
      online: false
    },
    {
      name: "Ankit",
      online: true
    }
  ];
  let username;

  socket.on('username', function(data) {
    const matchedUser = users.find(user =>  user.name === data);
    if (matchedUser) {
      matchedUser.online = true;
    } else {
      users.push({name: data, online: true})
    }
    username = data;
    io.emit('joining-alert', `${username} joined`);
    io.emit('typing', `${username} is typing...`);
  });

  socket.on('message', function(data) {
    io.emit('message', data);
  });

  socket.on('typing', function() {
    socket.broadcast.emit('typing', `${username} is typing...`);
  });

  socket.on('disconnect', function() {
    const matchedUser = users.find(user =>  user.name === username);
    if (matchedUser) {
      matchedUser.online = false;
    }
    socket.broadcast.emit('message', `${username} left :(((((`);
  });

  socket.on('users', function() {
    io.emit('users', users);
  });
});

server.listen(3001, function () {
  console.log('Server listening on localhost:3001.')
});
