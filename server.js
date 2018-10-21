const http = require('http');
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Task = require('./api/models/todoListModel'); //created model loading here
const Sport = require('./api/models/sportsModel');
const Authenticate = require('./api/models/authenticateModel');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
const port = process.env.PORT || 4040;
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// mongoose instance connection url connection
if (env === 'development') {
  mongoose.connect('mongodb://127.0.0.1:27017/todoListApi', { keepAlive: true, keepAliveInitialDelay: 300000, useNewUrlParser: true }); // this is our local testing environment
} else {
  mongoose.connect('mongodb://stav0049:Dante2010!@ds163822.mlab.com:63822/a1rest', {useNewUrlParser: true})
}

// Add headers
app.use(function (req, res, next) {
  if (req.method === 'OPTIONS') {
    console.log('INSIDE OPTIONS NOW....');
    var headers = {};

    // IE8 does not allow domains to be specific, just the *
    // headers['Access-Control-Allow-Origin'] = req.headers.origin
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
    res.writeHead(200, headers);
    res.end();
  } else {

    console.log('INSIDE ELSE OPTIONS NOW....');

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    res.setHeader('Access-Control-Max-Age', '86400');
    // Set to true if you need the website to include cookies in the requests sent

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Pass to next layer of middleware
    next();
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing route
var sportsRoutes = require('./api/routes/sportsRoutes'); // sports route
let authRoutes = require('./api/routes/authRoutes'); // auth routes
routes(app); //register the route
sportsRoutes(app);
authRoutes(app);

console.log('todo list RESTful API server started..');

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

module.exports = app;
