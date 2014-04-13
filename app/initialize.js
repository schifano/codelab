/*

   ___          _        __       _     
  / __\___   __| | ___  / /  __ _| |__  
 / /  / _ \ / _` |/ _ \/ /  / _` | '_ \ 
/ /__| (_) | (_| |  __/ /__| (_| | |_) |
\____/\___/ \__,_|\___\____/\__,_|_.__/ 
                                        

*/

// We wait for the document to finish loading.
$(document).ready(function() {

  // Let's create the user object.
  var user = {};
      user.nickname = "anonymous"; // Default nickname
      user.textarea = "";          // Default text file

  // Now open the socket connection
  var socket = io.connect('http://:8080');

  //
  //  Socket.io Listeners/Events
  //

  // Fired when the server passes the client a session id.
  socket.on('session-id', function (data) {

    user.session_id = data.session_id;

    socket.emit('update-user', user);

    socket.emit('refresh-friends');

  });

  // Fired when the server responds with partner code.
  socket.on('retrieve-code', function(textarea) {
    
    guestText.setValue(textarea);

  });

  // Fired when the server recieves an update from a partner.
  socket.on('watch-code', function(partnerUser) {

    guestText.setValue(partnerUser.textarea);
  
  });

  // Fired when a friend disconnects.
  socket.on('friend-disconnect', function () {

      socket.emit('refresh-friends');
  });

  // Fired when the server broadcasts the current list of online friends.
  socket.on('friends-broadcast', function (data) {

    $('ul#users').empty();

    for(var i = 0; i < data.length; i++){

      $('ul#users').append( "<li id=\"" + data[i].session_id + "\">" + data[i].nickname + "</li>");

    }

    $("#users li").on('click', function(e) {

      user.partner_id = this.id;

      socket.emit('update-user', user);

      socket.emit('fetch-code', user.partner_id); 

    });

  });

  //
  //  jQuery Listeners/Events
  //

  $("div.CodeMirror.cm-s-mdn-like").on("change keydown keyup paste", function() {

      user.textarea = userText.getValue();

      socket.emit('update-user', user);

  });


  $("#nicknameForm").submit(function() {

    user.nickname = $(this).children("#nicknameText").val();

    socket.emit('update-user', user);

    socket.emit('refresh-friends');

    return false;
  
  });

});




