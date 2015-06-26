var _ = require('underscore');

function SpotifyQueue () {

    var _tracks = [];
    var _currentTrack;

    return {
        /**
         * @param {SpotifyTrack} track
         */
        add : function (track) {
            _tracks.push(track);
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
