var io = require('socket.io').listen(8080);

var users = [];

//
//	On Connect
//

io.sockets.on('connection', function (socket) {

	// Emit the session_id in user object
  io.sockets.socket(socket.id).emit('session-id', {'session_id': socket.id});

  //
  //	Update User
  //
  
  socket.on('update-user', function (user) {

		for(var i = 0; i < users.length; i++){

			var found = false;

			if(users[i].session_id == this.id){

				found = true;

				users[i] = user;

			}

		}

		if(!found){

			users.push(user);

		}

		console.log(users);

  });

    
	//
	//	On Disconect
	//

	socket.on('disconnect', function (socket) {
	  
		for(var i = 0; i < users.length; i++){

			if(users[i].session_id == this.id){

				users.splice(i,1);

			}

		}

	});

});