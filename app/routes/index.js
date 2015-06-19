var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {});
});

router.get('/bot', function (req, res) {
    res.json({
       status: 200,
        msg : 'hit this endpoint with POST.',
        example: {}, //todo chat bot needs a mock data method
    });
});

router.post('/bot', function (req, res) {
   res.json({status: 200});
});

module.exports = router;