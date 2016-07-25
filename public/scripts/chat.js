var socket = io.connect('http://localhost:3000');
var username = "";

$('form').submit(function(){
  socket.emit('message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('connect', function() {
	//username = prompt("Please enter a username.");
	if(username != null) { username.substr(0, 20).trim();	}
	
	if(username === null || username === "") {	username = "Anon";	}
	
	socket.emit('server_receive_username', username);
});

socket.on('user_connected', function(username) {
	$('#messages').append($("<li id=\"usrConn\">").text(username + " has connected."));
});

socket.on('message', function(messageInfo) {	
  $('#messages').append('<li><b>' + messageInfo.user + ': </b>' + messageInfo.message + '</li>');
});