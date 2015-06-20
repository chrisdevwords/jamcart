var applescript = require('applescript');
var path = require('path');
var Deferred = require('hipchat-bot').Deferred;

var scripts = {
    'play' : 'tell application "Spotify" to play track "${t}"'
};

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
        }
        if (Array.isArray(rtn)) {
            rtn.forEach(function(songName) {
                console.log(songName);
            });
        }
        def.resolve({data:rtn, message:'playing'});
    });

    return def.promise();

};

module.exports = SpotifyControl;