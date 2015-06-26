
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
            track.id.should.equal(mock.spotify.trackId)
            return done();
        });

        it('should correctly parse a track id from a url', function (done) {
            track.id.should.equal(mock.spotify.trackId)
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
            return done();
        });

        it('should handle an http error', function (done) {

            //mock an error with sinon
            track.getInfo()
                .then(function (resp) {
                    console.log(resp);
                    done();
                });
        })

        it('should handle a request with an invalid id', function (done) {
            //mock an invalid id response with sinon
            track.getInfo()
                .then(function (resp) {
                    console.log(resp);
                    done();
                });
        })

        it('should parse track data', function (done){
            //mock a track data response with sinon
            track.getInfo()
                .then(function (resp) {
                    console.log(resp);
                    done();
                });
        });
    })
});
