const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blogs_helper')

const api = supertest(app)

beforeEach(helper.resetDB)

let authenticationValid // global var for authentication as 'sukalov'
const authenticationInvalid = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdXNlcm5hbWUiOiJtbHV1a2thaSIsInVzZXJuYW1lIjoibWx1dWtrYWkiLCJpZCI6IjY0N2Y3Y2I2MTVlODM0MTY2M2M4ZjQ5NSIsImlhdCI6MTY4NjM1MTIyMSwiZXhwIjoxNjg2MzU0ODIxfQ.HCOGMHcowJNmuDpWSJnMIQZF4FaZyqjKU5Ypj9UPiU7'
const validId1 = '5a422a851b54a676234d17f7' // blog that belongs to mluukkai
const validId2 = '6483bf6338b0f7827bd755e4' // blog that belongs to sukalov
const invalidId = '5a422a851b54a676234d17f5'

describe('when fetching all the data', () => {
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

describe('LOGIN', () => { // 3rd test from this section is necessary for completing all the folowing sections
  test('login with NO credentials returns 401', async () => {
    await api
      .post('/api/login')
      .expect(401)
  })
  test('login with BAD credentials returns 401', async () => {
    await api
      .post('/api/login')
      .send({ username: 'badname', password: 'badpassword' })
      .expect(401)
  })
  test('login with GOOD credentials returns 200 and a token', async () => {
    const res = await api
      .post('/api/login')
      .send({ username: 'sukalov', password: '00000000' })
      .expect(200)
    expect(res.body.token).toBeDefined()
    authenticationValid = `Bearer ${res.body.token}`
  })
})

describe('POST requests', () => {
  const newBlog = {
    title: 'Testing blog API with Jest',
    author: 'Matvey Sokolovsky',
    url: 'https://github.com/sukalov/FullStackOpen/blob/main/part4/bloglist/tests/app_router.test.js',
    user: '5a422a851b54a676234d17f7',
    _id: '647f70f62f56c86e8c575e5d',
    likes: 10,
  }
  test('you need authorization to post a blog', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('you cannot post with invalid token', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', authenticationInvalid)
      .send(newBlog)
      .expect(401)
  })

  test('blog can be added succesfully with valid token', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', authenticationValid)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.stateOfDB()
    const titles = blogsAfter.map((r) => r.title)
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length + 1)
    expect(titles).toContain('Testing blog API with Jest')
  })

  test('blog with NO LIKES can be added succesfully with default value of 0', async () => {
    const newBlogNoLikes = {
      title: 'Testing blog API with Jest',
      author: 'Matvey Sokolovsky',
      url: 'https://github.com/sukalov/FullStackOpen/blob/main/part4/bloglist/tests/app_router.test.js',
      user: '647f70f62f56c86e8c575e5d',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authenticationValid)
      .send(newBlogNoLikes)
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
      .set('Authorization', authenticationValid)
      .send(newBadBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', authenticationValid)
      .send(newBadBlog2)
      .expect(400)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })
})

describe('DELETE a blog by id', () => {
  test('only authorized users can delete blogs', async () => {
    await api
      .delete(`/api/blogs/${validId1}`)
      .expect(401)
  })
  test('token must be valid', async () => {
    await api
      .delete(`/api/blogs/${validId1}`)
      .set('Authorization', authenticationInvalid)
      .expect(401)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })

  test('trying to refer to non-existent id returns 404', async () => {
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', authenticationValid)
      .expect(404)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })

  test('user cannot delete other people\'s blogs', async () => {
    await api
      .delete(`/api/blogs/${validId1}`)
      .set('Authorization', authenticationValid)
      .expect(401)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })
  test('authorized user can successfully delete blogs', async () => {
    await api
      .delete(`/api/blogs/${validId2}`)
      .set('Authorization', authenticationValid)
      .expect(204)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length - 1)
  })
})

describe('updating blogs using PUT method', () => {
  test('only authorized users can change blogs', async () => {
    await api
      .put(`/api/blogs/${validId1}`)
      .send({ title: 'NEW TITLE' })
      .expect(401)
  })
  test('user token must be valid', async () => {
    await api
      .put(`/api/blogs/${validId1}`)
      .send({ title: 'NEW TITLE' })
      .set('Authorization', authenticationInvalid)
      .expect(401)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })
  test('trying to refer to non-existent id returns 404', async () => {
    await api
      .put(`/api/blogs/${invalidId}`)
      .send({ title: 'NEW TITLE' })
      .set('Authorization', authenticationValid)
      .expect(404)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })
  test('user cannot change other people\'s blogs', async () => {
    await api
      .put(`/api/blogs/${validId1}`)
      .send({ title: 'NEW TITLE' })
      .set('Authorization', authenticationValid)
      .expect(401)

    const blogsAfter = await helper.stateOfDB()
    expect(blogsAfter).toHaveLength(helper.defaultBlogs.length)
  })
  test('authorized user can successfully change his blogs', async () => {
    const response = await api
      .put(`/api/blogs/${validId2}`)
      .send({ title: 'NEW TITLE' })
      .set('Authorization', authenticationValid)
      .expect(200)
    console.log(response.body)
    expect(response.body.title).toEqual('NEW TITLE')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
