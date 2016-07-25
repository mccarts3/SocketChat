// Socket.io chat example
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var socket;

var users = [];
var numUsers = 0;

io.on('connection', function(socket){
	io.emit('connect');
	
	socket.on('server_receive_username', function(uName) {
		users.push({id: numUsers, username: uName});
		console.log(users[numUsers]);
		numUsers++;
		io.emit('user_connected', users[numUsers-1]);
	});

  socket.on('new_message', function(messageInfo){
  	io.emit('add_message', {user: users[messageInfo.id].username, message: messageInfo.message});
  });
  
	socket.on('disconnect', function() {
		console.log('User disconnected.');
	});
});

//[MAIN APP HTML ROUTE]
app.get('/', function (req, res) {
	var homePath = '/public/webpages/home.html';
	var indexPath = '/index.html';
  res.sendFile(__dirname + indexPath);
});

//[STATIC ROUTE DEFINITIONS]
app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));;

http.listen(3000, function(){
  console.log('listening on *:3000');
});
