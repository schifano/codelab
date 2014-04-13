(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("initialize", function(exports, require, module) {
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

      $('ul#users').append( "<li id=\"" + data[i].session_id + "\"><a href=\"#\">" + data[i].nickname + "</a></li>");

    }

    $("#users li").on('click', function(e) {

      e.preventDefault();

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





});

;
//# sourceMappingURL=app.js.map