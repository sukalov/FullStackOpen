import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3003
const { MONGO_URI } = process.env

export default {
  PORT,
  MONGO_URI,
}
