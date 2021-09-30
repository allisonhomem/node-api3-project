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

router.delete('/:id', logger, validateUserId, async (req, res) => {
  try{
    const {id} = req.params

    await Users.remove(id)

    res.json(req.user)
  }
  catch (err){
    res.status(500).json({message: "an error occurred attempting to delete the specified user"})
  }

});

router.get('/:id/posts', logger, validateUserId, async (req, res) => {
  try {
     const {id} = req.params

     const posts = await Users.getUserPosts(id)

     res.status(200).json(posts)
  }
  catch (err) {
    res.status(500).json({ message: "an error occurred while trying to retrieve user's posts" })
  }
});

router.post('/:id/posts', logger, validateUserId,  validatePost, (req, res) => {
  Posts.insert({
    user_id: req.params.id,
    text: req.text,
  })
       .then(newPost => {
         res.status(201).json(newPost)
       })
       .catch(err => {
         res.status(500).json({message: ""})
       })
});

//export
module.exports = router;