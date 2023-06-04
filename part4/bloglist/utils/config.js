// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3003
const MONGO_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI

module.exports = {
  PORT,
  MONGO_URI,
}
