var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Task = require('./api/models/todoListModel'); //created model loading here
var bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/todoListApi', { keepAlive: true, keepAliveInitialDelay: 300000, useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route

console.log('todo list RESTful API server started..');

app.listen(3000);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
