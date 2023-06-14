const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const tokenExtractor = require('../utils/tokenExtractor')
const userExtractor = require('../utils/userExtractor')
const { errorHandler } = require('../utils/errorHandler')

const appRouter = express.Router()
appRouter.use(tokenExtractor)
appRouter.use(userExtractor)
appRouter.use(errorHandler)

appRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

appRouter.post('/', async (req, res) => {
  if (!req.user) { res.status(401).json({ error: 'authentication required' }) } else {
    try {
      const blog = new Blog({ user: req.user, ...req.body })
      const savedBlog = await blog.save()
      const user = await User.findById(req.user).exec()
      // eslint-disable-next-line no-underscore-dangle
      user.blogs.push(savedBlog._id)
      await User.findByIdAndUpdate(req.user, { blogs: user.blogs })
      res.status(201).json(savedBlog)
    } catch (error) {
      console.log(req.body)
      res.status(400).json({ error })
    }
  }
})

appRouter.delete('/:id', async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: 'authentication required' })
  } else {
    try {
      const blog = await Blog.findById(req.params.id)
      if (req.user === blog.user.toString()) {
        await Blog.findByIdAndRemove(req.params.id)
        const user = await User.findById(req.user).exec()
        const updatedBlogs = user.blogs.filter((userBlog) => userBlog.toString() !== req.params.id)
        await User.findByIdAndUpdate(req.user, { blogs: updatedBlogs })
        res.status(204).send('content removed')
      } else {
        res.status(401).send({ error: 'non allowed to delete other people\'s notes' })
      }
    } catch (error) {
      res.status(404).send({ error: 'content not found' })
    }
  }
})

appRouter.put('/:id', async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: 'authentication required' })
  } else {
    try {
      const blog = await Blog.findById(req.params.id)
      if (req.user === blog.user.toString()) {
        const updated = await Blog.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true },
        )
        res.send(updated)
      } else {
        res.status(401).send({ error: 'non allowed to change other people\'s notes' })
      }
    } catch (error) {
      res.status(404).send({ error: 'content not found' })
    }
  }
})

module.exports = appRouter
