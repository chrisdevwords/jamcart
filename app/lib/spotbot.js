var HipChatBot = require('hipchat-bot');
var _ = require('underscore');
var spotify = require('./spotify-control');
var responses = require('./responses');

var SpotBot = function (slug) {
    this.slug = slug || '/spot';
};

_.extend(SpotBot.prototype, HipChatBot.prototype);

SpotBot.prototype.parseReq = function (reqData) {

    var _this = this;
    var def = HipChatBot.Deferred();
    var msg = this.stripSlug(this.getMessageText(reqData), this.slug);
    var command = msg.length ? this.getCommand(reqData) : 'playing';
    var userName = this.getUserName(reqData);

    switch (command) {
        case 'invalid track':
            def.resolve(_this.buildResponse(
                'Sorry, @'+ userName +'. I can only play tracks. No albums or playlists...', 'yellow'
            ));
            break;
        case 'play':
            spotify.requestTrack(msg, userName)
                .done(function (data){
                    if (data.queued) {
                        def.resolve(
                            _this.buildResponse(
                                //todo this will be a track name
                                // when async model for Spotify Track is working
                                '@'+ userName +' queued track:' + msg
                            )
                        );
                    } else {
                        def.resolve(
                            _this.buildResponse(
                                'Now playing '+ msg,'. Requested by : @' + userName
                            )
                        );
                    }
                })
                .fail(function (err) {
                    def.reject(
                        _this.buildResponse(
                            responses.fail(userName, command + msg, err), 'red', false, 'html'
                        )
                    );
                });
            break;
        case 'pause':
            if (spotify.isPaused()) {
                def.resolve(_this.buildResponse('@'+ userName +', spotify is already paused.','yellow'));
            } else {
                spotify.pause()
                    .done(function (){
                       def.resolve(_this.buildResponse('@'+ userName +' paused spotify'))
                    })
                    .fail(function (err) {
                        def.reject(
                            _this.buildResponse(
                                responses.fail(userName, command, err), 'red', false, 'html'
                            )
                        );
                    });
            }
            break;
        case 'resume':
            spotify.resume()
                .done(function (){
                    def.resolve(_this.buildResponse('@'+ userName +' resumed spotify'))
                })
                .fail(function (err){
                    def.reject(
                        _this.buildResponse(
                            responses.fail(userName, command, err), 'red', false, 'html'
                        )
                    );
                });
            break;
        case 'help':
            def.resolve(
                this.buildResponse(
                    responses.help(this.slug), 'purple', false, 'html'
                )
            );
            break;
        case 'playing' :
            spotify.nowPlaying()
                .done(function(data){
                    def.resolve(_this.buildResponse(data.message))
                })
                .fail(function(err){
                    def.reject(_this.buildResponse(err.message, 'red'));
                })
            break;
        default:
            def.reject(_this.buildResponse(
                '<p>Sorry, ' +  userName+ '. I couldn\'t process your request. ' +
                    'Your command was invalid. Try <i>' + this.slug +
                    ' help</i> for a list of commands and usage.</p>',
                    'red',
                    false,
                    'html'
            ));
            break;
    }

    return def.promise();
};

SpotBot.prototype.getUserName = function (reqData) {
    return this.getMessage(reqData).from.mention_name;
};

SpotBot.prototype.getCommand = function (reqData) {

    var parts = this.getMessageExploded(reqData);
    var msg = this.stripSlug(this.getMessageText(reqData), this.slug);

    if (msg.indexOf('spotify:track') === 0) {
        //todo needs to detect a valid spotify link
        return 'play';
    }
    if (msg.indexOf('https://open.spotify.com/track/') === 0) {
        return 'play';
    }
    if (msg.indexOf('open.spotify.com/album/') > -1) {
        return 'invalid track';
    }
    if (msg.indexOf('open.spotify.com/playlist/') > -1) {
        return 'invalid track';
    }
    if (msg.indexOf('spotify:album:') > -1) {
        return 'invalid track';
    }
    if (msg.indexOf(':playlist:') > -1) {
        return 'invalid track';
    }
    if (parts.indexOf('help') > -1) {
        return 'help';
    }
    if (parts.indexOf('pause') > -1) {
        return 'pause';
    }
    if (parts.indexOf('resume') > -1) {
        return 'resume';
    }
    if (parts.indexOf('playing') > -1) {
        return 'playing';
    }
    //todo prevent users from queing albums or playlists
    // return null or invalid request
    return null;
};

module.exports = SpotBot;
