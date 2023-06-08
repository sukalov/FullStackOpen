const tokenExtractor = (req, res, next) => {
  if (req.headers.authorization) {
    [req.authType, req.token] = req.headers.authorization.split(' ')
  }
  next()
}

module.exports = tokenExtractor
