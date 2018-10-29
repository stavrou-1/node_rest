'use strict';

module.exports = function(app) {
  let authList = require('../controllers/authController'),
      middlewares = require("../middleware/verifyToken");// middleware to check if the token is valid or not.

  // auth here
  app.route('/register')
    .post(authList.createUser);

  app.route('/login')
    .post(authList.loginUser);

  app.route('/events')
    .get(authList.events);

  app.route('/users')
    .get(authList.getAllUsers);

  app.route('/user')
    .post(middlewares.verifyToken, authList.getUserById)
    .get(middlewares.verifyToken, authList.getUserById);

  app.route('/special')
    .get(middlewares.verifyToken, authList.special);
}