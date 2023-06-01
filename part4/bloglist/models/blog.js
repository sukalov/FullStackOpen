/* eslint-disable no-underscore-dangle, no-param-reassign */

import mongoose from 'mongoose'
import config from '../utils/config.js'
import log from '../utils/log.js'

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const uri = config.MONGO_URI

console.log('connecting to', uri)
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

export default Blog
