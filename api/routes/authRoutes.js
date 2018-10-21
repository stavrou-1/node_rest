'use strict';

module.exports = function(app) {
  let authList = require('../controllers/authController'),
      middlewares = require("../middleware/verifyToken");

  // auth here
  app.route('/register')
    .post(authList.createUser);

  app.route('/login')
    .post(authList.loginUser);

  app.route('/events')
    .get(authList.events);

  app.route('/special')
    .get(authList.special);
}