const http = require('http');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const mongoose = require('mongoose');
const Task = require('./api/models/todoListModel'); //created model loading here
const bodyParser = require('body-parser');
const port = process.env.PORT || 4040;
process.env.NODE_ENV === 'production';

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/todoListApi', { keepAlive: true, keepAliveInitialDelay: 300000, useNewUrlParser: true }); // this is our local testing environment

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

console.log('todo list RESTful API server started..');

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

module.exports = app;
