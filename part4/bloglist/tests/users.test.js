const mongoose = require('mongoose')
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest')
const app = require('../app')
const helper = require('./users_helper')

const api = supertest(app)

beforeEach(helper.resetUsersDB)

describe('when fetching all the data', () => {
  test('all users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there are all users', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.defaultUsers.length)
  })
  test('every user has \'id\' property', async () => {
    const response = await api.get('/api/users')
    response.body.forEach((user) => expect(user.id).toBeDefined())
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
