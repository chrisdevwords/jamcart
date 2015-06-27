
var _ = require('underscore');
var request = require('request');
var path = require('path');

function SpotifyTrack (data, requestedBy) {

    var _uri = this.parseUri(data);
    var _id = this.parseId(_uri || '');
    var _this = this;

    this.__defineGetter__('albumName', function () {
        return _this.getAlbumName();
    });

    this.__defineGetter__('artistName', function () {
        return _this.getArtistName();
    });

    return _.extend(this, {
        get requestedBy () {
            return requestedBy;
        },
        get uri () {
            return _uri;
        },
        get id () {
            return _id;
        }
    });
};

SpotifyTrack.prototype.getAlbumName = function() {
    console.log('calling getAlbumName');
    if (this.album) {
        return this.album.name;
    }
    return undefined;
};

SpotifyTrack.prototype.getArtistName = function() {
    if (_.isArray(this.artists)) {
        return _.pluck(this.artists, 'name').join(', ');
    }
    return undefined;
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
                    data = _this.parseInfo(body);
                    if (data.error) {
                        reject(new Error(data.error.message));
                    } else {
                        _this.info = data;
                        resolve(_this.info);
                    }
                }
            });
    });
};

SpotifyTrack.prototype.parseUri = function (data) {

    var obj;

    if (typeof data === 'string') {
        obj = this.parseInfo(data);
        if (obj.error) {
            return data;
        }
    }
    return obj ? obj.uri : undefined;
};

SpotifyTrack.prototype.parseInfo = function (data) {
    var info;
    try {
        info = JSON.parse(data);
        _.extend(this, info);
    } catch (err) {
        return {error: {message: err.message}};
    }
    return info;
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
