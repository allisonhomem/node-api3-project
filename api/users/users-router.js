//imports
const express = require('express');
const router = express.Router();
const {logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware.js');
const Posts = require('../posts/posts-model.js');
const Users = require('./users-model.js');


//API Methods
router.get('/', logger, (req, res) => {
  Users.get()
       .then(users => {
         res.status(200).json(users)
       })
       .catch(err => {
         res.status(500).json({message: "there has been an error fetching users"})
       })
});

router.get('/:id', logger, validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', logger, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

//export
module.exports = router;