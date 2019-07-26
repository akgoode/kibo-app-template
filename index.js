const express = require('express');
const app = express();
const https = require('https');

const PORT = process.env.PORT || 8080;

require('./modules/router')(app);
const server = https.createServer(app);

server.listen(PORT,() => {
	console.log('Listening on port' + PORT);
});
server.timeout = 240000;
