class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: error.message })
  } if (error.name === 'TokenExpiredError') {
    response.status(401).json({ error: 'token expired' })
  } else {
    response.status(500).json({ error: error.message })
  }
}

module.exports = {
  errorHandler,
  ValidationError,
}
