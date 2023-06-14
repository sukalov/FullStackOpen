// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3004
const MONGO_URI = process.env.NODE_ENV !== 'production'
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI
const { JWT_SECRET } = process.env

module.exports = {
  PORT,
  MONGO_URI,
  JWT_SECRET,
}
