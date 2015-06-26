
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
            if (this.data.error) {
                def.reject(this.data.error);
            } else {
            def.resolve(this.data);
            }
        }
    };
    request.get('https://api.spotify.com/v1/tracks/' + this.id, cb);
    return def.promise();
};

SpotifyTrack.prototype.parseId = function (uri) {

    var segments;
    var id;

    if (uri.indexOf('track:')>-1) {
        segments = uri.split('track:');
        id = segments[segments.length -1];
    } else if (uri.indexOf('/') > -1) {
        segments = uri.split('/');
        id = segments[segments.length -1];
    }

    return id;
};

module.exports = SpotifyTrack;
