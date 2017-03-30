const express = require('express');

const app = express();
const {DEV, PROD} = require('./config');
const knex = require('knex')(DEV);
const bodyparser = require('body-parser');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  next();
});
// app.use(express.static('public'));
app.use(bodyparser.json());

let toDos = [];

app.get('/', (req, res) =>{
  knex('todos')
    .select(['title', 'order', 'completed', 'id'])
    .then(results => {
      const output = results.map( todoResults => {
        todoResults.url=`${req.protocol}://${req.get('host')}/${todoResults.id}`;
        return todoResults;
      });
      res.json(output);
    });
    // res.json(toDos);
});

app.get('/:id', (req, res) =>{
  knex('todos')
    .select(['title', 'order', 'completed', 'id'])
    .where('id', req.params.id )
    .then(results => res.json(results[0]))
});

app.post('/', (req, res) => {
  const userToDo = req.body;
  knex('todos')
    .insert({title: userToDo.title})
    .returning(['title', 'order', 'completed', 'id'])
    // .then(console.log('hi'))
    .then((results) => { 
      results[0].url= `${req.protocol}://${req.get('host')}/${results[0].id}`;
      console.log('results ->', results[0]);
      res.json(results[0]);
    })
    .catch(err => console.log(err));
});

app.delete('/', (req, res) => {
  knex('todos')
    .del()
    .then(res.send('delete success'));
});


// function runServer(databaseUrl=DATABASE_URL, port=PORT) {
//   return new Promise((resolve, reject) => {
//     mongoose.connect(databaseUrl, err => {
//       if (err) {
//         return reject(err);
//       }
//       server = app.listen(port, () => {
//         console.log(`Your app is listening on port ${port}`);
//         resolve();
//       })
//       .on('error', err => {
//         mongoose.disconnect();
//         reject(err);
//       });
//     });
//   });
// }
// // this function closes the server, and returns a promise. we'll
// // use it in our integration tests later.
// function closeServer() {
//   return mongoose.disconnect().then(() => {
//      return new Promise((resolve, reject) => {
//        console.log('Closing server');
//        server.close(err => {
//            if (err) {
//                return reject(err);
//            }
//            resolve();
//        });
//      });
//   });
// }

app.listen(process.env.PORT || 8080, () => {
	console.log(`Your app is listening on port ${process.env.PORT || 8080}`)});

exports.app = app;