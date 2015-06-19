var applescript = require('applescript');

var spotify = {
    play : function () {
        applescript.execFile(__dirname + '/appscr/test.scpt',  function(err, rtn) {
            if (err) {
                console.log(err);
            }
            if (Array.isArray(rtn)) {
                rtn.forEach(function(songName) {
                    console.log(songName);
                });
            }
        });
    }
};

module.exports = spotify;