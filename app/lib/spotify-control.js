var applescript = require('applescript');
var path = require('path');
var Deferred = require('hipchat-bot').Deferred;
var scripts = require('./spotify-scripts');
var SpotifyQueue = require('./spotify-queue');

var SpotifyControl = {};

var _paused = true;
var _int;
var _queue;
var _playlist;


SpotifyControl.start = function (playlist) {
    _queue = new SpotifyQueue();
    _paused = false;
    this.statusCheck();
    _playlist = playlist;
};

SpotifyControl.nextTrack = function () {
    var currentTrack = _queue.next();
    if (currentTrack){
        this.play(currentTrack.uri);
    } else {
        this.play(_playlist);
    }
};

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
            _paused = false;
            def.resolve({data: rtn, message: 'playing'});
        }
    });
    return def.promise();
};

SpotifyControl.requestTrack = function(uri, userName) {

    //todo this should be a proper Track Model
    //fetches data from Spotify API
    var def = Deferred();
    var currentTrack = _queue.currentTrack();

    _queue.add(uri, userName);

    if (!currentTrack) {
       currentTrack = _queue.next();
       this.play(currentTrack.uri)
           .done(function (data){
               def.resolve(data);
           })
           .fail(function (err){
              def.reject(err);
           });
   } else {
       def.resolve({queued: true});
   }
    return def.promise();
};

/**
 * Is Spotify paused?
 * @returns {boolean}
 */
SpotifyControl.isPaused = function () {
    return _paused;
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
            _paused = true;
            def.resolve({paused:_paused});
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
            _paused = false;
            def.resolve({paused:_paused});
        }
    });
    return def.promise();
};

SpotifyControl.nowPlaying = function () {
    var def = Deferred();
    var script = path.join(__dirname, 'appscr', 'currentsong.scpt')
    var cb = function(err, data, data2) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve({message: 'Now playing ' + data  });
        }
    };
    applescript.execFile(script, cb);
    return def.promise();
};

SpotifyControl.getPlayerState = function () {
    var def = Deferred();
    var script = path.join(__dirname, 'appscr', 'playerstatus.scpt');
    applescript.execFile(script, function (err, data) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve(data);
        }
    });
    return def.promise();
};

SpotifyControl.statusCheck = function () {
    var _this = this;
    if (!_paused) {
        this.getPlayerState()
            .done(function (status) {
                if (status === 'paused') {
                    console.log('next track');
                    _this.nextTrack();
                }
            })
    }
    _int = setTimeout(function() {
        _this.statusCheck();
    }, 500)
};

module.exports = SpotifyControl;
