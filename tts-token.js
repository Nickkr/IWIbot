'use strict';

var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap
var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var extend = (extend = require('util')._extend);

var ttsConfig = extend(
    {
        version: 'v1'
    },
    vcapServices.getCredentials('text_to_speech')
);

var ttsAuthService = watson.authorization(ttsConfig);

router.get('/token', function(req, res) {
    ttsAuthService.getToken({ url: ttsConfig.url }, function(err, token) {
        if (err) {
            console.log('Error retrieving token: ', err);
            res.status(500).send('Error retrieving token');
            return;
        }
        res.send(token);
    });
});

module.exports = router;