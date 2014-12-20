var mongoose = require('mongoose'),
    request = require('supertest')(require('../app')),
    Match = require('../models/match');

mongoose.connect('mongodb://localhost/lmt-node-test');

describe('match', function () {

  beforeEach(function (done) {
    Match.remove({}, done);
  });

  it('should return 404 when match not found', function (done) {
    request.get('/match/545d059738cdd4bc1b80ce44')
        .expect(404)
        .end(done);
  });

  it('should create a new match', function (done) {
    request.post('/match')
        .send({
          owner: 'pippo',
          date: new Date(),
          club: 'some club'
        })
        .expect(201)
        .end(done);
  });

  it('should retrieve a match by id', function (done) {
    Match.create({
      owner: 'pippo',
      date: new Date(),
      club: 'some club'
    }, function (err, match) {
      if (err) return done(err);

      request.get('/match/' + match._id)
          .expect(200)
          .expect(function (res) {
            expect(res.body).toBeDefined();
            expect(res.body.owner).toBe('pippo');
          })
          .end(done);
    });
  });

});