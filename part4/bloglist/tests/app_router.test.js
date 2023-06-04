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

test('blog can be added succesfully', async () => {
  const newBlog = {
    title: 'Testing blog API with Jest',
    author: 'Matvey Sokolovsky',
    url: 'https://github.com/sukalov/FullStackOpen/blob/main/part4/bloglist/tests/app_router.test.js',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.stateOfDB()
  const titles = blogsAfter.map((r) => r.title)
  expect(blogsAfter).toHaveLength(helper.defaultBlogs.length + 1)
  expect(titles).toContain('Testing blog API with Jest')
})

afterAll(async () => {
  await mongoose.connection.close()
})
