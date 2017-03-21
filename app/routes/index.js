var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {

    request({
      uri: "http://172.20.129.2:5000/haus",
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
