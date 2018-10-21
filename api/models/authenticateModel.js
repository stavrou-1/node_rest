'use strict';
var mongoose = require('mongoose');
var Schemas = mongoose.Schema;

var UserSchema = new Schemas({
    email: String,
    password: String
})

module.exports = mongoose.model('Authenticate', UserSchema)