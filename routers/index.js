var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('stream', { title: 'IWIBot!' });
});
/* GET home page. */
router.get('/textInput', function(req, res) {
    res.render('textInput', { title: 'IWIBot' });
});

router.get('/stream', function(req, res) {
    res.render('stream', { title: 'IWIBot' });
});

module.exports = router;

