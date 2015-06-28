var SSE = require('sse');
var http = require('http');

var i = 0;

var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('okay');
});

var conId = 0;

server.listen(9090, '127.0.0.1', function() {
    var sse = new SSE(server);
    sse.on('connection', function(client) {
        var myCon = conId++;

        console.log('start connection', myCon);
        var interval = setInterval(function() {
            console.log('Sending Hi', myCon, ++i);
            client.send('hi there! : ' + myCon + ' -> ' + i);
        }, 1000);

        client.on('close', function() {
            console.log('Closing', myCon);
            clearInterval(interval);
        });

    });

});

