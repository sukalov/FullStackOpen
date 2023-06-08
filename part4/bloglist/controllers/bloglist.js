const express = require('express')
const Blog = require('../models/blog')
const tokenExtractor = require('../utils/tokenExtractor')
const validation = require('../utils/validation')

const appRouter = express.Router()
appRouter.use(tokenExtractor)
appRouter.use(validation)

appRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

appRouter.post('/', async (req, res) => {
  if (!req.user) { res.status(400).json({ error: 'authentication required' }) } else {
    try {
      const blog = new Blog({ ...req.body })
      const savedBlog = await blog.save()
      res.status(201).json(savedBlog)
    } catch (error) {
      res.status(400).json({ error: 'bad request' })
    }
  }
})

appRouter.delete('/:id', async (req, res) => {
  if (!req.user) {
    res.status(400).json({ error: 'authentication required' })
  } else {
    try {
      const ids = (await Blog.find({})).map((el) => el.id)
      if (ids.includes(req.params.id)) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).send('content removed')
      } else res.status(404).json({ error: 'content not found' })
    } catch (err) {
      res.status(404).json({ err })
    }
  }
})

appRouter.put('/:id', async (req, res) => {
  if (!req.user) {
    res.status(400).json({ error: 'authentication required' })
  } else {
    try {
      const ids = (await Blog.find({})).map((el) => el.id)
      if (ids.includes(req.params.id)) {
        await Blog.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send('content updated')
      } else res.status(404).json({ error: 'content not found' })
    } catch (err) {
      res.status(404).json({ err })
    }
  }
})

module.exports = appRouter
