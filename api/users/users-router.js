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

router.post('/', logger, validateUser, (req, res) => {
  const {name} = req.body

  Users.insert({name})
       .then(newUser => {
         res.status(201).json(newUser)
       })
       .catch(err => {
         res.status(500).json({message: "an error occurred attempting to create a new user"})
       })
});

router.put('/:id', logger, validateUserId, validateUser, (req, res) => {
  const {id} = req.params
  const {name} = req.body

  Users.update(id, {name})
       .then(updatedUser => {
         res.status(200).json(updatedUser)
       })
       .catch(err => {
         res.status(500).json({message: "an error occurred attempting to update the specified user"})
       })
});

router.delete('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', logger, validateUserId, validateUser, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

//export
module.exports = router;