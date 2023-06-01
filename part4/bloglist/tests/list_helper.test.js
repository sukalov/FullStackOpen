/* eslint-disable prefer-destructuring */
// I intended to switch completely to ECMAScript modules but God I was wrong
// Unlike Node20, Jest is far from supporting  ES modules
// The only way I managed to run Jest testing with ES modules was:
// 1. add NODE_OPTIONS to env  2. run it with bun instead of npm, still not perfect but worked
// Thus I decided to come back to CommonJS modules in case of testing

const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of []', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('of [{likes: 4}]', () => {
    expect(listHelper.totalLikes([{ likes: 4 }])).toBe(4)
  })
  test('of [{likes: 4}, {likes: 2}]', () => {
    expect(listHelper.totalLikes([{ foo: 'bar', likes: 4 }, { likes: 2 }])).toBe(6)
  })
  test('of dummy blogs sums likes correctly', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favourite blog', () => {
  test('of []', () => {
    expect(listHelper.favoriteBlog([])).toEqual(undefined)
  })
  test('of [{likes: 4}]', () => {
    expect(listHelper.favoriteBlog([{ likes: 4 }])).toEqual({ likes: 4 })
  })
  test('of [{likes: 4}, {likes: 2}]', () => {
    expect(listHelper.favoriteBlog([{ foo: 'bar', likes: 4 }, { likes: 2 }])).toEqual({ foo: 'bar', likes: 4 })
  })
  test('of dummy blogs best result is 12', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('of [] equals {}', () => {
    expect(listHelper.mostBlogs([])).toEqual({})
  })
  test('of 1 test blogpost', () => {
    expect(listHelper.mostBlogs([{ author: 'test', likes: 4 }])).toEqual({ author: 'test', blogs: 1 })
  })
  test('of bloglist with no authors', () => {
    expect(listHelper.mostBlogs([{ foo: 'bar', likes: 4 }, { likes: 2 }])).toEqual({})
  })
  test('of bloglist where 1 authored post and many anonymous', () => {
    expect(listHelper.mostBlogs([{ foo: 'bar', likes: 4 }, { likes: 2 }, { author: 'test', likes: 4 }, { likes: 0 }])).toEqual({ author: 'test', blogs: 1 })
  })
  test('of dummy blogs where best result is Robert C. Martin', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('of [] equals {}', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })
  test('of 1 test blogpost', () => {
    expect(listHelper.mostLikes([{ author: 'test', likes: 4 }])).toEqual({ author: 'test', likes: 4 })
  })
  test('of bloglist with no authors', () => {
    expect(listHelper.mostLikes([{ foo: 'bar', likes: 4 }, { likes: 2 }])).toEqual({})
  })
  test('of bloglist where 1 authored post and many anonymous', () => {
    expect(listHelper.mostLikes([{ foo: 'bar', likes: 4 }, { likes: 2 }, { author: 'test', likes: 4 }, { likes: 0 }])).toEqual({ author: 'test', likes: 4 })
  })
  test('of dummy blogs where best result is Edsger W. Dijkstra', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
