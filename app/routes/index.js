var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/Corpus', function(req, res) {
    console.log(req.body);
    res.json(JSON.stringify(req.body));
});

router.post('/Translate', function(req, res) {
    console.log(req.body);
    request({
      uri: "http://172.20.129.2:5000/" + req.body['TranslationInput'],
      method: "GET",
    }, function(error, response, body) {
      if (error){
        res.json(JSON.stringify(error));
      }
      else{
        res.json(body);
      }
    });


});

module.exports = router;
