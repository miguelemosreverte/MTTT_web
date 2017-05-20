var express = require('express');
var request = require('request');
var expressSession = require('express-session');
var router = express.Router();
router.use(expressSession({secret:'somesecrettokenhere'}));

router.get('/', function(req, res) {
  res.render('home')
});

router.post('/CorpusPreparation', function(req, res) {
    req.session.LM_name = req.body.LM_name
    request.post('http://moses_api:5000/PrepareCorpus').form({
        TM_source : req.body.TM_source,
        TM_target : req.body.TM_target,
        LM : req.body.LM,
        source_lang : req.body.source_lang,
        target_lang : req.body.target_lang,
        LM_name : req.body.LM_name})
    .pipe(res);
});


router.post('/Evaluation', function(req, res) {
  request.post('http://moses_api:5000/Evaluate').form({
      WER : req.body.WER,
      PER : req.body.PER,
      HTER : req.body.HTER,
      BLEU : req.body.BLEU,
      BLEU2GRAM : req.body.BLEU2GRAM,
      BLEU3GRAM : req.body.BLEU3GRAM,
      BLEU4GRAM : req.body.BLEU4GRAM,
      EditedMT : req.body.EditedMT,
      UneditedMT : req.body.UneditedMT})
  .pipe(res);

});

router.post('/SetLM', function(req, res) {
      req.session.LM_name = req.body['LM_name']
});

router.post('/Translate', function(req, res) {
  //TODO send the translation text as POST instead of GET
    request.post('http://moses_api:5000/Translate').form({
        LM_name : req.session.LM_name,
        text : req.body['TranslationInput']})
    .pipe(res);
});

router.post('/GetAvailableLMs', function(req, res) {
      request.get('http://moses_api:5000/GetAllAvailableLanguageModelNames').pipe(res)
});

router.post('/Train', function(req, res) {
    request.get('http://moses_api:5000/Train/' + req.session.LM_name
    ).pipe(res)
});

module.exports = router;
