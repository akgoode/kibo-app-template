const express = require('express');
const app = express();
const http = require('http');

const PORT = process.env.PORT || 8080;

require('./modules/router')(app);
const server = http.createServer(app);

server.listen(PORT,() => {
	console.log('Listening on port' + PORT);
});
server.timeout = 240000;
