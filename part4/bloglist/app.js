import express, { json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import appRouter from './controllers/bloglist.js'

const app = express()

app.use(cors())
app.use(json())
app.use(morgan('dev'))

app.use('/api/blogs', appRouter)

export default app
