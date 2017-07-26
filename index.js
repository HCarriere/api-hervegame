'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config');
const app = express();
const port = process.env.PORT || config.server.port;
const server = http.createServer(app);

const mongo = require('./app/mongo');
const room = require('./app/room');

mongo.initMongo();

server.timeout = 0;
app.use(bodyParser.json());


// ROOMS
app
.get('/api/rooms', (req, res) => {
    room.functions.getRooms(req, (data) => {
        res.json(data);
    })
})
.post('/api/room/create', (req, res) => {
    room.functions.createRoom(req, (data) => {
        res.json(data);
    })
})
.post('/api/room/join', (req, res) => {
    room.functions.joinRoom(req, (data) => {
        res.json(data);
    })
})

.get('*', (req, res) => {
    res.status(404);
	sendJSON(res, {code:404});
})

// Error handler //////////
.use((err, req, res, next) => {
    console.log('Express error handler):' + err);
    sendJSON(res, err);
});

// application launch
server.listen(port, (err) => {
    if(err) {
        return console.log('Node launch error', err);
    }
    console.log(`API listening to *:${port})`);
});


/**
 * send a JSON to response header
 * @param  {[Object]} response
 * @param  {[Object]} json
 */
function sendJSON(response, json) {
	response.contentType('application/json');
	response.send(JSON.stringify(json, null, 4));
}

