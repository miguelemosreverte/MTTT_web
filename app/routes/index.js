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
                +"&TM_source="+req.body.TM_source
                +"&TM_target="+req.body.TM_target

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
    var pepe = '';
    var req2 = http.request(options, function(res2) {
        res2.setEncoding('utf8');
        res2.on('data', function (chunk) {
            console.log("chunk: " + chunk);
            pepe += chunk;
        });
        res2.on('end', function () {
              console.log("body end: " + pepe);
              res.json(pepe);
        });
    });
    req2.on('error', function(err) {
            //res.send('error: ' + err.message);
            console.log('error: ' + err.message);
        });
    req2.write(data);
    req2.end();
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
