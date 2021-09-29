//imports
const express = require('express');
const usersRouter = require('./users/users-router.js');

const server = express();


server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//export
module.exports = server;
