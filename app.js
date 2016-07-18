// Socket.io chat example
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));

// Usernames which are currently connected to the chat
var usernames = {};

io.on('connection', function(socket){
	socket.on('addUser', function(username) {
		socket.username = username;
		usernames[username] = username;
	});
	
	io.emit('connect');
	
  socket.on('message', function(msg){
  	io.emit('message', msg);
  });
  
	socket.on('disconnect', function() {
		console.log('User disconnected.');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
