const express = require('express');

const app = express();

const bodyparser = require('body-parser');

let toDos = [];
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});
// app.use(express.static('public'));
app.use(bodyparser.json());


app.get('/', (req, res) =>{
    res.json(toDos);
});

app.post('/', (req, res) => {
  res.json(req.body);
});

app.delete('/', (req, res) => {
  res.send('delete success');
});

app.listen(process.env.PORT || 8080);

exports.app = app;