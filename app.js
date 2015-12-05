var express = require('express');
var fs = require('fs');

var app = express();

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

app.get('/zombify', function(req, res, next) {
  // TODO: check if q param is there
  var text = req.query.q;

  // TODO: check length
  
  var translatedText = Translator.zombify(text);

  res.json({message: translatedText});
});

app.get('/unzombify', function(req, res, next) {
  // TODO: check if q param is there
  var text = req.query.q;

  // TODO: check length
  
  var translatedText = Translator.unzombify(text);

  res.json({message: translatedText});
});

app.use(function(req, res, next) {
  res.status(404);
  res.json({status: 404, message: "route not found"});
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});