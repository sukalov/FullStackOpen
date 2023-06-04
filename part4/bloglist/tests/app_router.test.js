const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./app_router_helper')
// const Blog = require('../models/blog.js')

const api = supertest(app)

beforeEach(helper.resetDB)

test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are all blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.defaultBlogs.length)
})

test('every blog has \'id\' property', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testing blog API with Jest',
    author: 'Matvey Sokolovsky',
    url: 'https://github.'
    likes: 10,
  }

  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const peopleAtEnd = await helper.peopleInDb()
  expect(peopleAtEnd).toHaveLength(helper.initialPersons.length + 1)

  const names = peopleAtEnd.map((r) => r.name)
  expect(names).toContain('Alexey Navalny')
})

afterAll(async () => {
  await mongoose.connection.close()
})
