const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const appRouter = require('./controllers/bloglist.js')

const app = express()

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

app.use('/api/blogs', appRouter)

module.exports = app
