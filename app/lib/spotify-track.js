
var _ = require('underscore');
var request = require('request');
var Deferred = require('hipchat-bot').Deferred;

function SpotifyTrack (uri, requestedBy) {

    var _id = this.parseId(uri);

    return _.extend(this, {
        get requestedBy () {
            return requestedBy;
        },
        get uri () {
            return uri;
        },
        get id () {
            return _id;
        }
    });
};

SpotifyTrack.prototype.getInfo = function () {
   var def = Deferred();
    var cb = function (err, response, body){
        if (err) {
            def.reject(err);
        } else {
            this.data = JSON.parse(body);
            def.resolve(this.data);
        }
    };
    request.get('https://api.spotify.com/v1/tracks/' + this.id, cb);
    return def.promise();
};

SpotifyTrack.prototype.parseId = function (uri) {
    var segments;
    if (uri.indexOf('track:')>-1) {
        segments = uri.split('track:');
        return segments[segments.length -1];
    }
    if (uri.indexOf('/') > -1) {
        segments = uri.split('/');
        return segments[segments.length -1];
    }
    return '';
};

module.exports = SpotifyTrack;