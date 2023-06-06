const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest')
const app = require('../app')
const helper = require('./app_router_helper')
// const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(helper.resetDB)

describe.only('when fetching all the data', () => {
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
})

describe('when making POST request', () => {
  test('blog can be added succesfully', async () => {
    const newBlog = {
      title: 'Testing blog API with Jest',
      author: 'Matvey Sokolovsky',
      url: 'https://github.com/sukalov/FullStackOpen/blob/main/part4/bloglist/tests/app_router.test.js',
      user: '5a422a851b54a676234d17f7',
      _id: '647f70f62f56c86e8c575e5d',
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
  test('blog with NO LIKES can be added succesfully with default value of 0', async () => {
    const newBlog = {
      title: 'Testing blog API with Jest',
      author: 'Matvey Sokolovsky',
      url: 'https://github.com/sukalov/FullStackOpen/blob/main/part4/bloglist/tests/app_router.test.js',
      user: '647f70f62f56c86e8c575e5d',
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

    const addedBlog = blogsAfter.find((blog) => blog.title === 'Testing blog API with Jest')
    expect(addedBlog.likes).toEqual(0)
  })
  test('requests with missing data are responded with 400', async () => {
    const newBadBlog = {
      author: 'Matvey Sokolovsky',
      url: 'https://github.com/sukalov/FullStackOpen/blob/main/part4/bloglist/tests/app_router.test.js',
    }
    const newBadBlog2 = {
      title: 'This note misses url',
      author: 'Matvey Sokolovsky',
    }

    await api
      .post('/api/blogs')
      .send(newBadBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newBadBlog2)
      .expect(400)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })
})

describe('when we DELETE a blog by id', () => {
  test('blog can be succesfully deleted with status 204', async () => {
  // eslint-disable-next-line no-underscore-dangle
    const goodId = helper.defaultBlogs[0]._id
    await api.delete(`/api/blogs/${goodId}`).expect(204)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length - 1)
  })
  test('trying to refer to non-existent id returns 404', async () => {
    const badId = '5a422a851b54a676234d17f6'
    await api.delete(`/api/blogs/${badId}`).expect(404)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })
})
describe('when updating specific blog', () => {
  test('if blog is found, it can be updated', async () => {
    // eslint-disable-next-line no-underscore-dangle
    const goodId = helper.defaultBlogs[0]._id
    await api.put(`/api/blogs/${goodId}`).send({ ...helper.defaultBlogs[0], likes: 999 }).expect(200)

    const blogsAfter = await helper.stateOfDB()
    const newBlog = blogsAfter.find((el) => el.id === goodId)
    expect(newBlog.likes).not.toEqual(helper.defaultBlogs[0].likes)
  })

  test('bad id returns 404', async () => {
    const badId = '5a422a851b54a676234d17f6'
    await api
      .put(`/api/blogs/${badId}`)
      .send({ ...helper.defaultBlogs[0], likes: 999 })
      .expect(404)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
