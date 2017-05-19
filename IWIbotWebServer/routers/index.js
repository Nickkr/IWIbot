var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('stream', { title: 'IWIBot' });
});
/* GET home page. */
router.get('/textInput', function(req, res, next) {
    res.render('textInput', { title: 'IWIBot' });
});

router.get('/stream', function(req, res, next) {
    res.render('stream', { title: 'IWIBot' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'IWIBot' });
});

module.exports = router;

