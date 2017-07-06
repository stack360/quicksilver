var http = require('http');
var express = require('express');


var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

app.use(express.static('build'));
app.get('*', function(request, response, next) {
    response.sendFile(__dirname + '/build/index.html');
});

server.listen(5000, function () {
    console.log('app listening on port 5000!');
});

process.on('SIGINT', function() {
    process.exit();
});

