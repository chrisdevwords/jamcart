
var _ = require('underscore');
var request = require('request');
var path = require('path');

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

    var id;

    if (uri.indexOf('track:') > -1) {
        id = uri.split('track:').slice(-1).pop();
    } else if (uri.indexOf('/') > -1) {
        id = path.parse(uri).name;
    }

    return id;
};

module.exports = SpotifyTrack;
