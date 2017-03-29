const express = require('express');

const app = express();

const bodyparser = require('body-parser');

// let toDos = [];
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// app.use(express.static('public'));
app.use(bodyparser.json());


app.get('/', (req, res) =>{
    res.send('toDos');
});

// app.post('/', (req, res) => {
//   res.send(req.body);
// });
// app.delete('/', (req, res) => {
//   res.status(204).json({message: 'success'});
// });

app.listen(process.env.PORT || 8080);

exports.app = app;