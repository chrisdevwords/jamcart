
var should = require('should');
var sinon = require('sinon');
var request = require('request');
var mock = require('../../mock');
var SpotifyTrack = require('../../../app/lib/spotify-track');

describe('The SpotifyTrack model', function () {

    describe('parsing functions', function () {

        var track;

        beforeEach(function (done) {
            track = new SpotifyTrack(mock.spotify.trackUri, 'Tester');
            return done();
        });

        it('should correctly parse a track id from a uri', function (done) {
            track.id.should.equal(mock.spotify.trackId);
            return done();
        });

        it('should correctly parse a track id from a url', function (done) {
            track.id.should.equal(mock.spotify.trackId);
            return done();
        });

    });

    describe('calls to the Spotify Web API', function (){

        var track;

        beforeEach(function (done) {
            track = new SpotifyTrack(mock.spotify.trackUri, 'Tester');
            return done();
        });

        afterEach(function (done) {
            //resotore request with sinon
            request.get.restore();
            return done();
        });

        it('should handle an http error', function (done) {
            var errMsg = 'Broke!';
            sinon
                .stub(request, 'get')
                .yields(new Error(errMsg));
            track.getInfo()
                .then(null, function (err){
                    err.should.be.a.Error;
                    err.message.should.be.a.String;
                    err.message.should.equal(errMsg);
                    done();
                }).catch(done);
        });

        it('should handle a request with an invalid id', function (done) {
            //mock an invalid id response with sinon
            var errorJSON = JSON.parse(mock.spotify.invalidId());
            sinon
                .stub(request, 'get')
                .yields(null, {status: 404}, mock.spotify.invalidId());
            track.getInfo()
                .then(null, function (err) {
                    err.should.be.a.Error;
                    err.message.should.be.a.String;
                    err.message.should.equal(errorJSON.error.message);
                    done();
                }).catch(done);
        });

        it('should parse track data', function (done){
            //mock a track data response with sinon
            sinon
                .stub(request, 'get')
                .yields(null, {status: 200}, mock.spotify.track());
            track.getInfo()
                .then(function (resp) {
                    done();
                }).catch(done);
        });
    });
});