var express = require('express');
var app = express();
var json_request = require('request-json');
var client = json_request.createClient('http://localhost:5000/#/');

//[MAIN APP HTML ROUTE]
app.get('/', function (req, res) {
	var homePath = '/public/webpages/home.html';
	var indexPath = '/index.html';
  res.sendFile(__dirname + indexPath);
});

app.get('/api/get-repos', function(request, response) {
	client.get('https://api.github.com/users/mccarts3/repos', function(err, res, body) {
		return response.json(body);
	});
});

//[STATIC ROUTE DEFINITIONS]
app.use(express.static('public'));
app.listen(process.env.PORT || 5000);