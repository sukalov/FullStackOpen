import express from 'express'
import Blog from '../models/blog.js'

const appRouter = express.Router()

appRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs)
    })
})

appRouter.post('/', (request, response) => {
  const blog = new Blog({ ...request.body })
  console.log({ ...request.body })
  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
})

export default appRouter