'use strict';
module.exports = function(app) {
  var sportsList = require('../controllers/sportsController');

  // Sports Routes
  app.route('/sports')
    .get(sportsList.listSports)
    .post(sportsList.createSport);

  app.route('/sports/:sportId')
    .get(sportsList.readSport)
    .put(sportsList.updateSport)
    .delete(sportsList.deleteSport);

};
