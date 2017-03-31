const express = require('express');
const app = express();
const {DEV, PROD} = require('./config');
const knex = require('knex')(DEV);
const bodyparser = require('body-parser');

app.use(function(req, res, next) { //addresses CORS issues, enables cross-domain CRUD access
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});
app.use(bodyparser.json());

function urlMaker (results, req) {
  return `${req.protocol}://${req.get('host')}/${results[0].id}` //returns server URL with database id appended as a param. NOT STORED IN DB
}

app.get('/', (req, res) =>{
  knex('todos')
    .select(['title', 'order', 'completed', 'id'])
    .then(results => {
      const output = results.map( result => {
        results[0].url= urlMaker(results, req);
        return result;
      });
      res.status(200).json(output);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

app.get('/:id', (req, res) =>{ //relies on URLs created by function urlMaker
  knex('todos')
    .select(['title', 'order', 'completed', 'id'])
    .where('id', req.params.id)
    .then(results => {
      results[0].url= urlMaker(results, req);
      res.status(200).json(results[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

app.post('/', (req, res) => {
  knex('todos')
    .insert(req.body)
    .returning(['title', 'order', 'completed', 'id'])
    .then((results) => { 
      results[0].url= urlMaker(results, req);
      res.status(201).json(results[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

app.delete('/', (req, res) => {
  knex('todos')
    .del()
    .then(res.sendStatus(204))
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

app.delete('/:id', (req, res) =>{
  knex('todos')
    .where('id', req.params.id)
    .del()
    .then(
      knex('todos')
      .select()
      .where('id', req.params.id))
    .then(res.sendStatus(204))
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

app.patch('/:id', (req, res) => {
  knex('todos')
    .where('id', req.params.id)
    .update(req.body)
    .returning(['title', 'order', 'completed', 'id'])
    .then((results) => { 
      results[0].url= urlMaker(results, req);
      res.status(200).json(results[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`)});

exports.app = app;