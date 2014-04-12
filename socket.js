var io = require('socket.io').listen(80);

var users = [];

io.sockets.on('connection', function (socket) {

  users.push(socket.id);

  io.sockets.socket(socket.id).emit('socket-id', {'Socket ID': socket.id});


});
