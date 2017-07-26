'use strict';

let mongo = require('../mongo');
let roomSchema = require('./schema').Schema;
let utils = require('../utils');


/*
Response: {
	rooms: [
		{
			roomId: String,
			name: String,
			locked: Boolean,
			remainingPlaces: Number,
		}
	],
	responseCode: Number,
}
*/
function getRooms(req, callback) {
    let params = {
        apiKey: null,
    };
    let data = {};
    utils.getParamsFromRequest(req, params);
    
    
    
    mongo.find(roomSchema, (err, result) => {
        if(err) {
            data.responseCode = 400;
            data.error = err;
        } else {
            data.responseCode = 200;
        }
        data.rooms = [];
        for(let room of result) {
            data.rooms.push({
                roomId: room.roomId,
                name: room.name,
                locked: room.password?true:false,
                remainingPlaces: getRemainingPlaces(room),
            });
        }
        callback(data);
    }, {}); //TODO : filter by apikey (client)
}

/*
params: {
	player: playerid,
	params: {
		sides: [
			{
				players: Number,
				name: String,
			}
		],
		password: String
		name: String,
	}
}
*/
function createRoom(req, callback) {
    let params = {
        player: null,
        params: {},
    };
    let data = {};
    let room = {};
    
    utils.getParamsFromRequest(req, params);
    console.log(JSON.stringify(params));
    
    // TODO : validate user input
    room.owner = params.player;
    room.name = params.params.name;
    room.client = ''; // TODO : get client
    room.roomId = generateRoomId(params); // TODO : build id
    room.sides = [];
    for(let side of params.params.sides) {
        room.sides.push({
            playerMax: side.playerMax,
            name: side.name,
            players: [],
        });
    }
    room.sides[0].players.push(params.player);
    room.password = params.params.password; // TODO : hash
    room.chat = [];
    
    mongo.add(roomSchema, (err, result) => {
        console.log('room added');
        callback({
            responseCode: 200,
            roomId: room.roomId,
        });
    }, room);
}

function joinRoom(req, callback) {
    
}
    
function getRemainingPlaces(room) {
    let remaining = 0;
    for(let side of room.sides) {
        remaining += side.playerMax - side.players.length;
    }
    return remaining;
}

function generateRoomId(params) {
    return params.player+'_'+Date.now()+'_'+Math.random();
}
module.exports = {
    getRooms,
    createRoom,
    joinRoom,
};