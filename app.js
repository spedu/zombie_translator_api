var express = require('express');
var fs = require('fs');

var app = express();
var router = express.Router();

var logger = require('./logger');
var markdownTransformer = require('./markdown_transformer');
var Translator = require('./translator');

app.use(function(req, res, next) {
  logger(req, res);
  next();
});

app.get('/', function(req, res) {
  var file = fs.createReadStream('README.md');
    
  file.pipe(markdownTransformer()).pipe(res);
});

router.use(function(req, res, next) {
  if(req.query.q !== undefined && req.query.q !== '') {
    next();
  } else {
    res.json({status: 422, message: 'q parameter undefined'});
  }
});

router.use(function(req, res, next) {
  if(req.query.q.length <= 1000) {
    next();
  } else {
    res.json({status: 414, message: 'request parameter over 1000 characters in length'});
  }
});

router.get('/zombify', function(req, res, next) {
  var text = req.query.q;
  var translatedText = Translator.zombify(text);

  res.json({message: translatedText});
});

router.get('/unzombify', function(req, res, next) {
  var text = req.query.q;
  var translatedText = Translator.unzombify(text);

  res.json({message: translatedText});
});

app.use('/api', router);

app.use(function(req, res, next) {
  res.status(404);
  res.json({status: 404, message: "route not found"});
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  if(host === '::' || host === '127.0.0.1') {
    host = 'localhost';
  }

  console.log('Listening at http://%s:%s', host, port);
});