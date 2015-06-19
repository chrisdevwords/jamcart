var path = require('path'),
    express = require('express'),
    logger = require('morgan'),
    cookies = require('cookie-parser'),
    body = require('body-parser'),
    swig = require('swig'),
    routes = require('./app/routes/index'),
    ngrok = require('ngrok'),
    nconf = require('nconf'),
    app = express();

nconf.argv()
    .env()
    .file(path.join(__dirname, 'config.json'));

// set views to render with swig
app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', path.join(__dirname, 'app', 'views'));
app.use('/test-coverage', express.static(path.join(__dirname , 'test-coverage')));
app.set('port', (process.env.PORT || 5000));

app.use(logger('dev'));
app.use(body.json());
app.use(body.urlencoded({extended: false}));
app.use(cookies());
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function () {
    var port = app.get('port');
    console.log('Node app is running at localhost:' + port);
    ngrok.connect(port, function (err, url){
        if (err) {
            console.error('Error exposing local server via ngrok' , err);
        } else {
            nconf.set('ngrokUrl', url);
            console.log(nconf.get('ngrokUrl'))
            console.log('Exposed via ngrok at ', url);
        }
    });
});

module.exports = app;

