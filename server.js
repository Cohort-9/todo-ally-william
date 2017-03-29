const express = require('express');

const app = express();

// let toDos = [];

app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) =>{
    res.send('toDos');
});

// app.delete('/', (req, res) => {
//   res.status(204).send('Success');
// });

app.listen(process.env.PORT || 8080);

exports.app = app;