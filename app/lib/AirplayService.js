var applescript = require('applescript');
var path = require('path');
var Deferred = require('hipchat-bot').Deferred;
var scripts = require('./spotify-scripts');
var SpotifyQueue = require('./spotify-queue');

var AirplayService = {};

AirplayService.StartAirplay = function(){
    var def = Deferred();
    var script = path.join(__dirname, 'appscr', 'startairplay.scpt');
    applescript.execFile(script, function (err, data) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve(data);
        }
    });
    return def.promise();
}


module.exports = AirplayService;