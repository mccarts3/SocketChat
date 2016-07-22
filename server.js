var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];
var rooms = [];
var anonNum = 0;

function addUser(user) {
	var userTaken = false;
	for(var i = 0; i < users.length; i++) {
		if(users[i] == user) {
			userTaken = true;
			console.log("Username is already taken. Assigning anonymous username...");
		}
	}
			
	if(userTaken) {	
		users.push(user);	
	}
	else {
		users.push("Anon"+anonNum);
		anonNum++;
	}
}

function deleteUser(user) {
	for(var i = 0; i < users.length; i++) {
		if(users[i] == user) {
			users.splice(i, 1);
		}
	}
}

io.on('connection', function (socket) {  
  io.emit('connect');
	
	socket.on('server_receive_username', function(username) {		
		addUser(username);
		io.emit('user_connected', username);
	});

  socket.on('message', function(msg){
  	io.emit('message', msg);
  });
  
	socket.on('disconnect', function(username) {
		deleteUser(username);
		console.log('User disconnected.');
	});
});

//[MAIN APP HTML ROUTE]
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//[STATIC ROUTE DEFINITIONS]
app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));;

http.listen(3000, function(){
  console.log('listening on *:3000');
});
