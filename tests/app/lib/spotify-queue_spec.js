var mock = require('../../mock');
var SpotifyTrack = require('../../../app/lib/spotify-track');
var SpotifyQueue = require('../../../app/lib/spotify-queue');

// when empty, next should return null
describe('The SpotifyQueue', function () {

    var queue;

    beforeEach(function (done) {
        queue = new SpotifyQueue();
        done();
    });

    describe('the currentTrack method', function () {

        describe('when called on an empty queue', function () {
            it('should return undefined', function (done) {
                (queue.currentTrack() === undefined).should.be.true;
                return done();
            });
        });

        describe('when called on a queue with 1 track', function () {

            var track;

            beforeEach(function (done) {
                track = new SpotifyTrack(mock.spotify.track());
                queue.add(track);
                return done();
            });

            it('should return undefined', function (done) {
                (queue.currentTrack() === undefined).should.be.true;
                return done();
            });

            describe('after next has been called', function () {

                beforeEach(function (done) {
                    queue.next();
                    return done();
                });

                it('should return the current track', function (done) {
                    queue.currentTrack().should.equal(track);
                    return done();
                });

            });

        });
    });

    describe('the next method', function () {

        var track;

        describe('when called on an empty queue', function () {
            it('should return undefined', function (done) {
                (queue.next() === undefined).should.equal(true);
                return done();
            });
        });

        describe('when called on a queue with 1 track', function () {

            beforeEach(function (done) {
                track = new SpotifyTrack(mock.spotify.track());
                queue.add(track);
                return done();
            });

            it('should return that track', function (done) {
                queue.next().should.equal(track);
                return done();
            });

            it('should set the currentTrack', function (done) {
                queue.next();
                queue.currentTrack().should.equal(track);
                return done();
            });

            it('should result in an empty queue', function (done) {
                queue.next();
                queue.length().should.equal(0);
                return done();
            });

        });

        describe('when called on a queue with 2 tracks', function () {

            var secondTrack;

            beforeEach(function (done) {
                track = new SpotifyTrack(mock.spotify.track());
                queue.add(track);
                secondTrack = new SpotifyTrack();
                queue.add(secondTrack);
                done();
            });

            it('should return the 1st track that was queued', function (done) {
                queue.next().should.equal(track);
                done();
            });

            it('should set the currentTrack to the 1st queued track', function (done) {
                queue.length().should.equal(2);
                queue.next();
                queue.currentTrack().should.equal(track);
                queue.currentTrack().should.not.equal(secondTrack);
                return done();
            });

            it('should result in a queue with a length of 1', function (done) {
                queue.next();
                queue.length().should.equal(1);
                return done();
            });

            it('should return the 2nd track when called twice', function (done) {
                queue.next();
                queue.next().should.equal(secondTrack);
                return done();
            });

            it('should empty the queue when called twice', function (done) {
                queue.next();
                queue.next();
                queue.length().should.equal(0);
                return done();
            });
        });
    });

    /*
    describe('A fetched array of queued tracks', function() {
        it('should match the length of queued tracks', function (done) {
            return done();
        });
        it('should match the contents of the queue', function (done) {
            return done();
        });
        it('Should be of separate scope from the queue', function (done) {
            return done();
        });
    });
    */
});
