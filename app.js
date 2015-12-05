var express = require('express');
var fs = require('fs');

var app = express();

var markdownTransformer = require('./markdown_transformer');

app.get('/', function(req, res) {
  var file = fs.createReadStream('README.md');
    
  file.pipe(markdownTransformer()).pipe(res);
});

app.get('/zombify', function(req, res) {

});

app.get('/unzombify', function(req, res) {

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