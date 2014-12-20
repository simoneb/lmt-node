var express = require('express'),
    router = new express.Router(),
    Match = require('../models/match');

router.route('/match/:id?')
    .get(function (req, res, next) {
      var id = req.params.id;

      Match.findOne({ _id: id }, function (err, match) {
        if (err) return next(err);
        if (!match) return next({
          message: 'match not found',
          status: 404
        });

        res.send(match);
      });
    })
    .post(function (req, res, next) {
      Match.create(req.body, function (err, match) {
        if (err) return next(err);

        res.status(201).send(match);
      });
    });

module.exports = router;