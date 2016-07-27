// Socket.io chat example
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var socket;

var users = [];
var numUsers = 0;

function addUser(username) {
	var userTaken = false;
	for(var i = 0; i < users.length; i++) {
		if(users[i].username == username) {
			userTaken = true;
			console.log("Username is already taken. Assigning anonymous username...");
		}
	}
			
	if(!userTaken) {	
		users.push({id: numUsers, username: username});
		console.log(users[numUsers]);
		numUsers++;	}
	else {
		users.push({id: numUsers, username: "Anon"+numUsers});		
		console.log(users[numUsers]);		
		numUsers++;
	}
}

function deleteUser(username) {
	for(var i = 0; i < users.length; i++) {
		if(users[i].username == username) {
			users.splice(i, 1);
			numUsers--;
		}
	}
}

io.on('connection', function(socket){
	io.emit('connect');
	
	socket.on('server_receive_username', function(username) {
		addUser(username);
		io.emit('user_connected', users[numUsers-1]);
	}); 

  socket.on('new_message', function(messageInfo){
  	io.emit('add_message', {username: users[messageInfo.id].username, message: messageInfo.message});
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
