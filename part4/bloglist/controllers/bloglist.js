const express = require('express')
const Blog = require('../models/blog')

const appRouter = express.Router()

appRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

appRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog({ ...request.body })
    const res = await blog.save()
    response.status(201).json(res)
  } catch (error) {
    response.status(400).json({ error: 'bad request'})
  }
})

module.exports = appRouter
