/* eslint-disable no-underscore-dangle, no-param-reassign */

const mongoose = require('mongoose')
const config = require('../utils/config')
const log = require('../utils/log')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
  author: String,
  url: String,
  likes: { type: Number, default: 0 }
})

const Blog = mongoose.model('Blog', blogSchema)

const uri = config.MONGO_URI

log.info('connecting to', uri)
mongoose.connect(uri).then(
  log.green('connected'),
).catch((e) => log.red(`failed to connect: ${e}`))

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = Blog
