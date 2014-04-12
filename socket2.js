var io = require('socket.io').listen(80);

var users = [];

io.sockets.on('connection', function (socket) {
  var user = new Object();
  user.socketID = socket.id;
  users.push(user);

  io.sockets.socket(socket.id).emit('socket-id', {'Socket ID': socket.id});
  
  for(var i = 0; i < users.length; i++) {
	console.log(users[i].socketID);
  }
  //console.log(users);
  console.log(users.length);

});

io.sockets.on('textarea', function(socket) {



}
