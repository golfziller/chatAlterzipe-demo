var express = require('express');

var app = express();
var path = require('path');
var port = 3333;

var server = app.listen(port, function () {
    console.log('Listening on port: ' + port);
});

app.use(express.static('public'));





var io = require('socket.io').listen(server);
var allClients = [];





app.get('/', function (req, res) {

    res.sendFile('views/index.html', { root: __dirname })

});



io.on('connection', function (socket) {

    var i = allClients.indexOf(socket);

    if (i == -1) {
        allClients.push(socket);
        io.emit('online', '' + allClients.length - 1);
    }



    socket.on('chat', function (data) {
        io.emit('chat', data);

    });

    socket.on('disconnect', function () {
        console.log('Got disconnect!');
        var i = allClients.indexOf(socket);

        if (i != -1) {

            allClients.splice(i, 1);
            io.emit('online', '' + allClients.length - 1);
        }



    });


});



