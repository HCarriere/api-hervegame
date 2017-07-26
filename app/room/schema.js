'use strict';

let mongoose = require('mongoose');
const conf = require('../../config')

// rooms

module.exports.Schema = {
    schema:mongoose.Schema({
        name: String,
        password: String,
        owner: String,
        client: String,
        roomId: String,
        sides: [
            {
                playerMax: Number,
                name: String,
                players: [String],
            }
        ],
        chat: [
            {
                player: String,
                message: String,
            }
        ],
    }),
    collection : conf.database.collections.rooms,
};
