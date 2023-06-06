const express = require('express')
const Blog = require('../models/blog')

const appRouter = express.Router()

appRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

appRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog({ ...request.body })
    const res = await blog.save()
    response.status(201).json(res)
  } catch (error) {
    response.status(400).json({ error: 'bad request' })
  }
})

appRouter.delete('/:id', async (req, res) => {
  try {
    const ids = (await Blog.find({})).map((el) => el.id)
    if (ids.includes(req.params.id)) {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).send('content removed')
    } else res.status(404).json({ error: 'content not found' })
  } catch (err) {
    res.status(404).json({ err })
  }
})
appRouter.put('/:id', async (req, res) => {
  try {
    const ids = (await Blog.find({})).map((el) => el.id)
    if (ids.includes(req.params.id)) {
      await Blog.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).send('content updated')
    } else res.status(404).json({ error: 'content not found' })
  } catch (err) {
    res.status(404).json({ err })
  }
})

module.exports = appRouter
