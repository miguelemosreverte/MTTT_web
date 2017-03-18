var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', credit: 'https://github.com/b00giZm/docker-compose-nodejs-examples' });
});

router.post('/', function(req, res) {


    console.log(req.body);
    //res.json({ src_lang: req.body.src_lang,trg_lang: req.body.trg_lang,TM: req.body.TM,LM: req.body.LM});    
    res.json(req.body);
});

module.exports = router;
