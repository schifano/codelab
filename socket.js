var io = require('socket.io').listen(8080);

var users = [];

//
//	On Connect
//

io.sockets.on('connection', function (socket) {

	// Emit the session_id in user object
  io.sockets.socket(socket.id).emit('session-id', {'session_id': socket.id, 'nickname':'annonymous'});

  socket.on('fetch-code', function(partnerID) {
    for(var i = 0; i < users.length; i++) {
      if(users[i].session_id == partnerID) {
        socket.emit('retrieve-code', users[i].textarea);
      }
    } 

  });


  //
  //	Update User
  //
 

  socket.on('update-user', function (user) {
		updateUser(user);
		var found = false;

		for(var i = 0; i < users.length; i++){

			// If the user is in the array...
			if(users[i].session_id == this.id){

				found = true;

				// Add the updated user.
				users[i] = user;


			}

		}

		// If the user is not in the array...
		if(!found){

			// Then we add the user to the array.
			users.push(user);

		}

	});

	socket.on('refresh-friends', function(user){

  	var friends = [];

  	var friend = {};

  	// Build a friends list.

		for(var i = 0; i < users.length; i++){

				friend.session_id = users[i].session_id;

				friend.nickname = users[i].nickname;

				friends.push(friend);

				friend = {};
		}

		// Emit the friends list to the requesting user
		socket.broadcast.emit('friends-broadcast', friends);
		socket.emit('friends-broadcast', friends);

	});
   
	//
	//	On Disconect
	//

	socket.on('disconnect', function () {
	  
		for(var i = 0; i < users.length; i++){

			if(users[i].session_id == this.id){

				users.splice(i,1);

			}

		}

		socket.broadcast.emit('friend-disconnect');


	});

	function updateUser(userIn) {
		for(var i = 0; i < users.length; i++) {
			if(users[i].partner_id  == userIn.session_id) {
				console.log("found partner");
				//users[i].watch_code = userIn.text_area;
				io.sockets.socket(users[i].session_id).emit('watch-code', userIn); 
			} 
		}
	}

});
