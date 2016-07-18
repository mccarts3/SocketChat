// Socket.io chat example
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
//var redis = require('socket.io-redis');
//io.adapter(redis({ host: 'localhost', port: 6379 }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, 'public')));

// Usernames which are currently connected to the chat
var usernames = {};

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

http.listen(3000, function(){
  console.log('listening on *:3000');
});
