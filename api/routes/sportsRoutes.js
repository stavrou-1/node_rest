'use strict';

module.exports = function(app) {
  var sportsList = require('../controllers/sportsController'),
      middlewares = require('../middleware/verifyToken')// auth middleware

  // Sports Routes
  app.route('/sports')
    .get(middlewares.verifyToken, sportsList.listSports)
    .post(sportsList.createSport);

  app.route('/sports/:sportId')
    .get(middlewares.verifyToken, sportsList.readSport)
    .put(sportsList.updateSport)
    .delete(sportsList.deleteSport);

};
