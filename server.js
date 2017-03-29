var express = require('express');

var app = express();

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) =>{
    res.send('This is a get endpoint');
});

app.listen(process.env.PORT || 8080);

exports.app = app;