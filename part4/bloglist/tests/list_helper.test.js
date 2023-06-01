/* eslint-disable prefer-destructuring */
// I intended to switch completely to ECMAScript modules but God I was wrong
// Unlike Node20, Jest is far from supporting  ES modules
// The only way I managed to run Jest testing with ES modules was:
// 1. add NODE_OPTIONS to env  2. run it with bun instead of npm, still not perfect but worked
// Thus I decided to come back to CommonJS modules in case of testing

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})