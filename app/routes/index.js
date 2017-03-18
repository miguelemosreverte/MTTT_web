var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', credit: 'https://github.com/b00giZm/docker-compose-nodejs-examples' });
});

module.exports = router;
