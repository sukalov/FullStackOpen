class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  } if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  response.status(500).json({ error: error.message })
}

module.exports = {
  errorHandler,
  ValidationError,
}
