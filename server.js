const http = require('http');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Task = require('./api/models/todoListModel'); //created model loading here
const Sport = require('./api/models/sportsModel');
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
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
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
routes(app); //register the route
sportsRoutes(app);

console.log('todo list RESTful API server started..');

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

module.exports = app;
