var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/CorpusPreparation', function(req, res) {

    //var data = querystring.stringify(req.body);
    var data = "source_lang="+req.body.src_lang
                +"&target_lang="+req.body.trg_lang
                +"&LM_name="+req.body.LM_name
                +"&LM="+req.body.LM
                +"&TM="+req.body.TM

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
    var req2 = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
    });
    req2.on('error', function(err) {
            //res.send('error: ' + err.message);
            console.log('error: ' + err.message);
        });
    req2.write(data);
    req2.end();

    res.json(data + "..." + JSON.stringify(req.body));
/*
    request({
      uri: "http://172.20.129.2:5000/PrepareCorpus" + req.body['TranslationInput'],
      method: "POST",
    }, function(error, response, body) {
      if (error){
        res.json(JSON.stringify(error));
      }
      else{
        res.json(body);
      }
    });*/


});

router.post('/Translate', function(req, res) {
    console.log(req.body);
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
