var io = require('socket.io').listen(8080);

var users = [];

//
//	On Connect
//

io.sockets.on('connection', function (socket) {

	// Emit the session_id in user object.
  io.sockets.socket(socket.id).emit('session-id', {'session_id': socket.id});

 	// Fired when the client sends a user to update to the server.
  socket.on('update-user', function (user) {
		
		// Let's search for this user.
		var found = false;

		for(var i = 0; i < users.length; i++){

			// If the user is in the array...
			if(users[i].session_id == this.id){

				found = true;

				// Tell partners of this user about the update.
				updateUser(user);

				// Add the updated user.
				users[i] = user;

			}

		}

		// If the user is not in the array...
		if(!found){

			// Then we add the user to the array.
			users.push(user);

			// Nobody is their partner yet!

		}

	});

  // Fired when the client requests to refresh the friends list.
  // (This happens when nicknames are changed.)
	socket.on('refresh-friends', function(user){

  	var friends = [];

  	var friend = {};

  	// Build a list of online friends.

		for(var i = 0; i < users.length; i++){

				friend.session_id = users[i].session_id;

				friend.nickname = users[i].nickname;

				friends.push(friend);

				friend = {};
		}

		// Emit the friends list to everyone...
		socket.broadcast.emit('friends-broadcast', friends);
		
		// including the user who made the request.
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

		// Tell everyone a friend has disconnected.
		// Clients will then request an updated friends list.
		socket.broadcast.emit('friend-disconnect');

	});

	// Fired when the client requests to see their partner's code.
	socket.on('fetch-code', function(partnerID) {
    
    for(var i = 0; i < users.length; i++) {
    
      if(users[i].session_id == partnerID) {
    
        socket.emit('retrieve-code', users[i].textarea);
    
      }
    
    } 

  });

	// Tells partners of user about changes made to their text file.
	function updateUser(userIn) {

		for(var i = 0; i < users.length; i++) {
		
			if(users[i].partner_id  == userIn.session_id) {
		
				console.log("found partner");

				io.sockets.socket(users[i].session_id).emit('watch-code', userIn); 
			
			} 
		}
	}

});
