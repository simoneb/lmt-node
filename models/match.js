var mongoose = require('mongoose');

var Match = mongoose.model('Match', {
  owner: String,
  date: Date,
  club: String
});

module.exports = Match;