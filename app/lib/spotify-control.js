var applescript = require('applescript');
var path = require('path');
var Deferred = require('hipchat-bot').Deferred;
var scripts = require('./spotify-scripts');

var paused = true;
var SpotifyControl = {};

/**
 * plays a track (or album or playlist, etc.) in spotify
 * @param {string} track - a spotify uri or http link
 * @returns {HipChatBot.Deferred}
 */
SpotifyControl.play = function (track) {

    var def = Deferred();
    var script = scripts.play.split('${t}').join(track);

    applescript.execString(script,  function(err, rtn) {
        if (err) {
            def.reject(err);
        } else {
            console.log('play agruments??', arguments);
            paused = false;
            def.resolve({data: rtn, message: 'playing'});
        }
    });
    return def.promise();
};

/**
 * Is Spotify paused?
 * @returns {boolean}
 */
SpotifyControl.isPaused = function () {
    return paused;
};

/**
 * Pauses spotify.
 * @returns {HipChatBot.Deferred}
 */
SpotifyControl.pause = function () {
    var def = Deferred();
    applescript.execString(scripts.pause,  function(err) {
        if (err) {
            def.reject(err);
        } else {
            console.log('pause arguments???', arguments);
            paused = true;
            def.resolve({paused:paused});
        }
    });
    return def.promise();
};

/**
 * Resumes spotify.
 * @returns {HipChatBot.Deferred}
 */
SpotifyControl.resume = function () {
    var def = Deferred();
    applescript.execString(scripts.resume,  function(err) {
        if (err) {
            def.reject(err);
        } else {
            paused = false;
            def.resolve({paused:paused});
        }
    });
    return def.promise();
};

SpotifyControl.status = function () {
    var def = Deferred();
    applescript.execFile(__dirname + '/appscr/currentsong.scpt',  function(err, data, data2) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve({data:data, data2:data2});
        }
    });
    return def.promise();
}

module.exports = SpotifyControl;