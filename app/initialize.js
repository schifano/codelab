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

	user.session_id = data;
	
	socket.emit('update-user', user);
});

$(document).ready(function() {

var oldVal = "";
$("#userText").on("change keyup paste", function() {

    var currentVal = $(this).val();
    
    if(currentVal == oldVal) {
    
        return; //check to prevent multiple simultaneous triggers
    
    }
    
    oldVal = currentVal;

    user.text_area = oldVal;

    //socket.emit('textarea', {textarea: oldVal});   
    socket.emit('update-user', user);

});
	
});


