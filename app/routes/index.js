var express = require('express');
var router = express.Router();
var request = require('request');
var querystring = require('querystring');
var http = require('http');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home');
});
router.post('/CorpusPreparation', function(req, res) {

    var data = querystring.stringify(req.body);
    var options = {
        host: '172.20.129.2',
        port: 5000,
        path: '/PrepareCorpus',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };
    var final_result = '';
    var moses_api_request = http.request(options, function(moses_response) {
        moses_response.setEncoding('utf8');
        moses_response.on('data', function (chunk) {
            final_result += chunk;
        });
        moses_response.on('end', function () {
              res.json(final_result);
        });
    });
    moses_api_request.on('error', function(err) {
            //res.send('error: ' + err.message);
            console.log('error: ' + err.message);
        });
    moses_api_request.write(data);
    moses_api_request.end();
});


router.post('/Evaluation', function(req, res) {

    var data = querystring.stringify(req.body);
    var options = {
        host: '172.20.129.2',
        port: 5000,
        path: '/Evaluate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };
    var final_result = '';
    var moses_api_request = http.request(options, function(moses_response) {
        moses_response.setEncoding('utf8');
        moses_response.on('data', function (chunk) {
            final_result += chunk;
        });
        moses_response.on('end', function () {
              res.json(final_result);
        });
    });
    moses_api_request.on('error', function(err) {
            //res.send('error: ' + err.message);
            console.log('error: ' + err.message);
        });
    moses_api_request.write(data);
    moses_api_request.end();
});

router.post('/SetLM', function(req, res) {

    request({
      uri: "http://172.20.129.2:5000/SetLM/" + req.body['LM_name'],
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

router.post('/Translate', function(req, res) {
    request({
      uri: "http://172.20.129.2:5000/Translate/" + req.body['TranslationInput'],
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

router.post('/GetAvailableLMs', function(req, res) {
    request({
      uri: "http://172.20.129.2:5000/GetAllAvailableLanguageModelNames",
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

router.post('/Train', function(req, res) {
    console.log(req.body);
    request({
      uri: "http://172.20.129.2:5000/Train",
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
