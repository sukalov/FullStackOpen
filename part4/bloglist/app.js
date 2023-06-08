const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const appRouter = require('./controllers/bloglist.js')
const usersRouter = require('./controllers/users.js')
const { errorHandler } = require('./utils/errorHandler.js')
const loginRouter = require('./controllers/login.js')
const tokenExtractor = require('./utils/tokenExtractor.js')

const app = express()

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(tokenExtractor)

app.use('/api/blogs', appRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app
