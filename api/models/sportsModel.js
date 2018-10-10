'use strict';
var mongoose = require('mongoose');
var SportSchema = mongoose.Schema;

var SportsSchema = new SportSchema({
  team: {
    type: String,
    required: 'A genre is required at this endpoint'
  },
  stateAbbr: {
    type: String,
    required: 'You need to pass in a state containing an NBA team'
  },
  arena: {
    type: String,
    required: 'You need to enter an arena for your team'
  },
  city: {
    type: String,
    required: 'You need to enter a city'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  state: {
    type: [{
      type: String,
      enum: ['super team', 'rookie', 'veteran', 'transition']
    }],
    default: ['transition']
  },
  players: {
    player: {
      teamNum: Number,
      name: String,
      position: String,
      type: String,
      auto: true
    }
  },
  history: {
    type: String,
    required: 'A short description of the team is required'
  }
});

module.exports = mongoose.model('Sports', SportsSchema);
