/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

// eslint-disable-next-line consistent-return
loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }
  const userForToken = {
    _username: user.username,
    get username() {
      return this._username
    },
    set username(value) {
      this._username = value
    },
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: 60 * 60 })

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
