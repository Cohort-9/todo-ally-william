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
    .select()
    .then(results => res.json(toDos));
    // res.json(toDos);
});

app.post('/', (req, res) => {
  const userToDo = req.body;
  console.log(userToDo);
  knex('todos')
    .insert(userToDo)
    .returning()
    // .then(console.log('hi'))
    .then((results) => res.json(results))
    .catch(err => console.log(err));
});

app.delete('/', (req, res) => {
  res.send('delete success');
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