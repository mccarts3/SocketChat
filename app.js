var express = require('express');
var app = express();

//[MAIN APP HTML ROUTE]
app.get('/', function (req, res) {
	var homePath = '/public/webpages/home.html';
	var indexPath = '/index.html';
  res.sendFile(__dirname + indexPath);
});

//[STATIC ROUTE DEFINITIONS]
app.use(express.static('public'));
app.listen(process.env.PORT || 5000);