var HipChatBot = require('hipchat-bot');
var _ = require('underscore');
var applescript = require('applescript');

var SpotBot = function (slug) {
    this.slug = slug || '/spot';
};

_.extend(SpotBot.prototype, HipChatBot.prototype);

SpotBot.prototype.parseReq = function (reqData) {
    var _this = this;
    var def = HipChatBot.Deferred();
    this.playSong()
        .done(function (data){
            def.resolve(_this.buildResponse(JSON.stringify(data.data)))
        })
        .fail(function (err){
           def.reject(_this.buildResponse(err.message, 'red'));
        });
    return def.promise();
};

SpotBot.prototype.playSong = function() {
    var def = HipChatBot.Deferred();
    applescript.execFile(__dirname + '/appscr/test.scpt',  function(err, rtn) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve({msg:'success', data: rtn});
        }
    });
    return def.promise();
}

module.exports = SpotBot;
