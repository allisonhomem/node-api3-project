//imports
const Users = require('../users/users-model.js');


//Middleware functions
function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  
  console.log(`The method ${method} was used at the url ${url} at the time ${timestamp}`);

  next();
}

async function validateUserId(req, res, next) {
  try{
    const {id} = req.params
    const user = await Users.getById(id)

    if(!user){
      res.status(404).json({message: "user not found"})
    }
    else {
      req.user = user;
      next();
    }
  }
  catch {
    res.status(500).json({message: "an error occurred while validating user id"})
  }
}

function validateUser(req, res, next) {
  
  next();
}

function validatePost(req, res, next) {
  
  next();
}


//export
module.exports = {logger, validateUserId, validateUser, validatePost};
