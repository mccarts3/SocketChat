var socket = io.connect('http://localhost:5000');
var username = "";
var socketID = 0;

$('form').submit(function(){
  socket.emit('new_message', {id: socketID, message: $('#m').val()});
  $('#m').val('');
  return false;
});

socket.on('connect', function() {
	username = prompt("Please enter a username.");
	if(username != null) { username.substr(0, 20).trim();	}
	
	if(username === null || username === "") {	username = "Anon";	}
	
	socket.emit('server_receive_username', username);
});

socket.on('user_connected', function(socket) {
	socketID = socket.id;
	$('#messages').append($("<li id=\"usrConn\">").text(socket.username + " has connected."));
});

socket.on('add_message', function(messageInfo) {	
  $('#messages').append('<li><b>' + messageInfo.username + ': </b>' + messageInfo.message + '</li>');
  updateScroll();
});

function updateScroll() {
  var element = document.getElementById("messages");
  element.scrollTop = element.scrollHeight;
}