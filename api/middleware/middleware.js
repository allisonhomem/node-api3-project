function logger(req, res, next) {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  
  console.log(`The method ${method} was used at the url ${url} at the time ${timestamp}`);

  next();
}

function validateUserId(req, res, next) {
  
  next();
}

function validateUser(req, res, next) {
  
  next();
}

function validatePost(req, res, next) {
  
  next();
}


//export
module.exports = {logger, validateUserId, validateUser, validatePost};
