'use strict';

var mongoose = require('mongoose'),
      Sport = mongoose.model('Sports');

exports.listSports = (req, res) => {
  Sport.find({}, function(err, sport) {
    if (err)
      res.send(err);
    res.json(sport);
  });
};

exports.createSport = (req, res) => {
  var newTask = new Sport(req.body);
  newTask.save(function(err, sport) {
    if (err)
      res.send(err);
    res.json(sport);
  });
};

exports.readSport = (req, res) => {
  Sport.findById(req.params.sportId, function(err, sport) {
    if (err)
      res.send(err);
    res.json(sport);
  });
};

exports.updateSport = (req, res) => {
  Sport.findOneAndUpdate({_id: req.params.sportId}, req.body, {new: true}, function(err, sport) {
    if (err)
      res.send(err);
    res.json(sport);
  });
};

exports.deleteSport = (req, res) => {
  Sport.remove({
    _id: req.params.sportId
  }, function(err, sport) {
    if (err)
      res.send(err);
    res.json({ message: 'Sport successfully deleted' });
  });
}
