/*

   ___          _        __       _     
  / __\___   __| | ___  / /  __ _| |__  
 / /  / _ \ / _` |/ _ \/ /  / _` | '_ \ 
/ /__| (_) | (_| |  __/ /__| (_| | |_) |
\____/\___/ \__,_|\___\____/\__,_|_.__/ 
                                        

*/

	
// Let's create the user object.
var user = {};

// Now the socket connection
var socket = io.connect('http://localhost:8080');

socket.on('session-id', function (data) {

	user.session_id = data.session_id;

	socket.emit('update-user', user);
	
});

/*
$(document).ready(function (){
	
	$('#userText').bind('input propertychange', function() {

		socket.emit('textarea', { my: 'data' });

	});

});

*/
