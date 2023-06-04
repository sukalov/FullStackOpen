const express = require('express')
const Blog = require('../models/blog')

const appRouter = express.Router()

appRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
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

module.exports = appRouter
