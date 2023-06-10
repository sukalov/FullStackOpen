const jwt = require('jsonwebtoken')
const config = require('./config')

const validation = (req, res, next) => {
  if (req.token) {
    req.user = jwt.verify(req.token, config.JWT_SECRET).id
  }
  next()
}

module.exports = validation
