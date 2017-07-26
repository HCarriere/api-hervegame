'use strict';

let room = require('./room');
let schema = require('./schema').Schema;

module.exports = {
    Schema: schema,
    functions: room,
};