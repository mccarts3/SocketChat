// Socket.io chat example
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var username = document.getElementById('username');
var socket;

var users = [];

window.onload = function() {
	// Set/check values using 
	//    var asdf = document.getElementById('asdf');
}

io.on('connection', function(socket){
	io.emit('connect');
	
	socket.on('server_receive_username', function(username) {		
		io.emit('user_connected', username);
	});

  socket.on('message', function(msg){
  	io.emit('message', msg);
  });
  
	socket.on('disconnect', function() {
		console.log('User disconnected.');
	});
});

//[MAIN APP HTML ROUTE]
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/home.html');
});

//[STATIC ROUTE DEFINITIONS]
app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));;

http.listen(3000, function(){
  console.log('listening on *:3000');
});
