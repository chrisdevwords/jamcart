
var express = require('express');
var router = express.Router();
var nconf = require('nconf');
var HipChatBot = require('hipchat-bot');
var SpotBot = require('../lib/spotbot');

var bot = new SpotBot();

router.get('/', function (req, res) {
    console.log( nconf.get('ngrokUrl'));
    res.render('index', {ngrokUrl: nconf.get('ngrokUrl')});
});

router.get('/bot', function (req, res) {
    res.send(HipChatBot.Mock.getHook('/spot testing'));
});

router.post('/bot', function (req, res) {
    bot.parseReq(req.body)
        .always(function (resp) {
            res.json(resp);
        });
});

module.exports = router;
