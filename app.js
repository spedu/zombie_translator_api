var express = require('express');
var fs = require('fs');

var app = express();

var logger = require('./logger');
var markdownTransformer = require('./markdown_transformer');
var Translator = require('./translator').Translator();

app.use(function(req, res, next) {
  logger(req, res);
  next();
});

app.get('/', function(req, res) {
  var file = fs.createReadStream('README.md');
    
  file.pipe(markdownTransformer()).pipe(res);
});

var queryStringCheck = function(req, res, next) {
  if(req.query.q !== undefined && req.query.q !== '') {
    next();
  } else {
    res.status(422);
    res.json({status: 422, message: 'q parameter undefined'});
  }
};

var queryStringLengthCheck = function(req, res, next) {
  if(req.query.q.length <= 1000) {
    next();
  } else {
    res.status(414);
    res.json({status: 414, message: 'request parameter over 1000 characters in length'});
  }
};

app.get('/zombify', queryStringCheck, queryStringLengthCheck, function(req, res) {
  var text = req.query.q;
  var translatedText = Translator.zombify(text);

  res.json({message: translatedText});
});

app.get('/unzombify', queryStringCheck, queryStringLengthCheck, function(req, res) {
  var text = req.query.q;
  var translatedText = Translator.unzombify(text);

  res.json({message: translatedText});
});

app.use(function(req, res, next) {
  res.status(404);
  res.json({status: 404, message: "route not found"});
  next();
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  if(host === '::' || host === '127.0.0.1') {
    host = 'localhost';
  }

  console.log('Listening at http://%s:%s', host, port);
});