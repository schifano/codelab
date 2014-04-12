var io = require('socket.io').listen(8080);

var users = [];

io.sockets.on('connection', function (socket) {
  var user = new Object();
  user.socketID = socket.id;
  users.push(user);

  io.sockets.socket(socket.id).emit('session-id', {'Socket ID': socket.id});
  
  for(var i = 0; i < users.length; i++) {
	console.log(users[i].socketID);
  }
  //console.log(users);
  console.log(users.length);

socket.on('update-user', function(data) {
	var user = new Object();
	
	user.text_area = data;
	console.log(data.text_area);
	console.log(data.session_id);
	console.log("here");

	for(var i = 0; i < users.length; i++) {
		if(users[i].session_id == data.session_id) {
			users[i] = data.text_area;
		}
	}

});
});
