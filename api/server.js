//imports
const express = require('express');
const usersRouter = require('./users/users-router.js');
const server = express();
 

//which url and middleware to use
server.use(express.json());
server.use('/api/users/', usersRouter);


//export
module.exports = server;
