var HipChatBot = require('hipchat-bot');
var _ = require('underscore');
var spotify = require('./spotify-control');

var SpotBot = function (slug) {
    this.slug = slug || '/spot';
    this.queue = [];
};

_.extend(SpotBot.prototype, HipChatBot.prototype);

SpotBot.prototype.parseReq = function (reqData) {
    var _this = this;
    var def = HipChatBot.Deferred();
    var msg = this.stripSlug(this.getMessageText(reqData), this.slug);
    var command = this.getCommand(msg);

    spotify.play(msg)
        .done(function (data){
            def.resolve(_this.buildResponse(JSON.stringify(data.data)))
        })
        .fail(function (err){
           def.reject(_this.buildResponse(err.message, 'red'));
        });
    return def.promise();
};

SpotBot.prototype.getCommand = function (msg) {
    return 'play';
};

module.exports = SpotBot;
