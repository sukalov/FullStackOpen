// eslint-disable-next-line import/no-unresolved
require('express-async-errors')
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { ValidationError } = require('../utils/errorHandler')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1, author: 1, url: 1, likes: 1, id: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {
    username, name, password, blogs,
  } = request.body
  if (password.length < 3) throw new ValidationError('password too short')
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
    blogs,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
