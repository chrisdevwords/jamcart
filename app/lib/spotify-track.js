
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

    var _this = this;
    var data;

    return new Promise(function (resolve, reject) {
        request.get(
            'https://api.spotify.com/v1/tracks/' + _this.id,
            function (err, response, body) {
                if (err) {
                    reject(err);
                } else {
                    data = JSON.parse(body);
                    if (data.error) {
                        reject(new Error(data.error.message));
                    } else {
                        _this.data = data;
                        resolve(_this.data);
                    }
                }
            });
    });
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
