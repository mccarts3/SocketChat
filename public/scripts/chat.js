var socket = io.connect('http://localhost:3000');
var username = "";

$('form').submit(function(){
  socket.emit('message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('connect', function() {
	//username = prompt("Please enter a username.").substr(0, 20);
	if(username === null || username === "") {	username = "Anon";	}
	
	$('#messages').append($("<li id=\"usrConn\">").text(username + " has connected."));
});

socket.on('message', function(msg){	
	var messageText = username + ": " + msg;
	
  $('#messages').append('<li><b>' + username + ': </b>' + msg + '</li>');
});