
var sinon = require('sinon');
var request = require('request');
var mock = require('../../mock');
var SpotifyTrack = require('../../../app/lib/spotify-track');

describe('The SpotifyTrack model', function () {

    describe('parsing functions', function () {

        it('should correctly parse a track id from a uri', function (done) {
            var track = new SpotifyTrack(mock.spotify.trackUri);
            track.id.should.equal(mock.spotify.trackId);
            track.parseId(mock.spotify.trackUri).should.equal(mock.spotify.trackId);
            return done();
        });
        it('should correctly parse a track id from a url', function (done) {
            var track = new SpotifyTrack(mock.spotify.trackUrl);
            track.id.should.equal(mock.spotify.trackId);
            track.parseId(mock.spotify.trackUrl).should.equal(mock.spotify.trackId);
            track.parseId(mock.spotify.trackUrl + '/').should.equal(mock.spotify.trackId);
            return done();
        });

        it('should not parse an id if passed an album uri', function (done) {
            var name = 'Tester';
            var track = new SpotifyTrack(mock.spotify.albumUri, name);
            (track.id === undefined).should.be.true;
            return done();
        });

        it('should have a property indicating who requested it', function (done) {
            var name = 'Tester';
            var track = new SpotifyTrack(mock.spotify.trackUrl, name);
            track.requestedBy.should.equal(name);
            return done();
        });

        it('should be able to parse raw info as from the api', function (done) {
            var track = new SpotifyTrack(mock.spotify.track());
            track.id.should.equal(mock.spotify.trackId);
            track.uri.should.equal(mock.spotify.trackUri);
            track.name.should.equal(mock.spotify.trackName);
            track.albumName.should.equal(mock.spotify.albumName);
            track.artistName.should.equal(mock.spotify.artistName);
            track.duration_ms.should.equal(mock.spotify.trackDuration);
            track.popularity.should.equal(mock.spotify.trackPopularity);
            return done();
        });

        it('should not require data to be passed via constructor', function (done) {
            var track = new SpotifyTrack();
            (track.id === undefined).should.equal(true);
            (track.albumName === undefined).should.equal(true);
            (track.artistName === undefined).should.equal(true);
            track.parseInfo(mock.spotify.track());
            track.id.should.equal(mock.spotify.trackId);
            track.uri.should.equal(mock.spotify.trackUri);
            track.name.should.equal(mock.spotify.trackName);
            track.albumName.should.equal(mock.spotify.albumName);
            track.artistName.should.equal(mock.spotify.artistName);
            track.duration_ms.should.equal(mock.spotify.trackDuration);
            track.popularity.should.equal(mock.spotify.trackPopularity);
            return done();
        });

        it('should be able to correctly parse a track with multiple artists', function (done) {
            var multiArtistName = mock.spotify.artistA.name + ', ' + mock.spotify.artistB.name;
            var track = new SpotifyTrack(mock.spotify.track({
                artists: [mock.spotify.artistA, mock.spotify.artistB]
            }));
            track.artistName.should.equal(multiArtistName);
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
            //restore request with sinon
            request.get.restore();
            return done();
        });

        it('should handle an http error', function (done) {
            var errMsg = 'Broke!';
            sinon
                .stub(request, 'get')
                .yields(new Error(errMsg));
            track.getInfo()
                .then(null, function (err) {
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
