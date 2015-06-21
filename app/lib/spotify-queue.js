var _ = require('underscore');

function SpotifyQueue () {

    var _tracks = [];
    var _currentTrack;

    return {

        add : function (trackUri, userName) {
            _tracks.push({
                uri: trackUri,
                userName: userName
            });
        },

        length : function () {
            return _tracks.length;
        },

        next : function () {
            _currentTrack = _tracks.shift();
            return _currentTrack;
        },

        currentTrack : function () {
            return _currentTrack;
        }
    }
}

module.exports = SpotifyQueue;
