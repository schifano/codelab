/*

   ___          _        __       _     
  / __\___   __| | ___  / /  __ _| |__  
 / /  / _ \ / _` |/ _ \/ /  / _` | '_ \ 
/ /__| (_) | (_| |  __/ /__| (_| | |_) |
\____/\___/ \__,_|\___\____/\__,_|_.__/ 
                                        

*/

	
// Let's create the user object.
var user = {};
    user.nickname = "anonymous";
    user.textarea = "partner code";

// Now the socket connection
var socket = io.connect('http://:8080');

socket.on('retrieve-code', function(textarea) {
  console.log("made it");
  $('#viewCode').val(textarea);

});

socket.on('session-id', function (data) {

	user.session_id = data.session_id;
	
	socket.emit('update-user', user);

  socket.emit('refresh-friends');
});

socket.on('watch-code', function(partnerUser) {
	console.log("got partner shit");
	console.log(partnerUser.nickname);
	console.log(partnerUser.textarea);
	$('#viewCode').val(partnerUser.textarea);
});

socket.on('friend-disconnect', function () {

    socket.emit('refresh-friends');
});

socket.on('friends-broadcast', function (data) {

  $('ul#users').empty();

  console.log(data);

  for(var i = 0; i < data.length; i++){

  $('ul#users').append( "<a href=\"#\"><li id=\"" + data[i].session_id + "\">" + data[i].nickname + "</li></a>");

  }

  $("#users li").on('click', function(e) {

    user.partner_id = this.id;

    socket.emit('update-user', user);
    var test = "hi"; 
    socket.emit('fetch-code', user.partner_id); 
    console.log(user);    

  });

});

$(document).ready(function() {

var oldVal = "";
$("#userText").on("change keydown keyup paste", function() {

    var currentVal = $(this).val();
    
    //if(currentVal == oldVal) {
    
     //   return; //check to prevent multiple simultaneous triggers
    
    //}
    
    oldVal = currentVal;

    user.textarea = oldVal;

    //socket.emit('textarea', {textarea: oldVal});   
    socket.emit('update-user', user);

});


$("#nicknameForm").submit(function() {
  //console.log($(this).children("#nicknameText").val());
  
  var nick = $(this).children("#nicknameText").val();
  user.nickname = nick;
  //console.log(nick);
  socket.emit('update-user', user);

  socket.emit('refresh-friends');
  return false;
});

});




