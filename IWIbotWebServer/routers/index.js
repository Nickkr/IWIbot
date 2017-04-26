var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'IWIBot' });
});
/* GET home page. */
router.get('/textInput', function(req, res, next) {
    res.render('textInput', { title: 'IWIBot' });
});

module.exports = router;

