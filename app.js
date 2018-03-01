(function () {
    'use strict';
    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var stt = require('./routers/stt-token.js');
    var tts = require('./routers/tts-token.js');
    var index = require('./routers/index');

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    //Force Https
    function requireHTTPS(req, res, next) {
        if (req.headers && req.headers.$wssp === "80") {
            return res.redirect('https://' + req.get('host') + req.url);
        }
        next();
    }

    app.use(requireHTTPS);
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/static', express.static(path.join(__dirname, 'public')));
    app.use('/', index);
    app.use('/api/speech-to-text/', stt);
    app.use('/api/text-to-speech/', tts);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    module.exports = app;
})();