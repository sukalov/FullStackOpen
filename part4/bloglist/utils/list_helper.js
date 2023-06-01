/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  console.log('')
  return 1
}

const totalLikes = (blogs) => (
  blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
)

const favoriteBlog = (blogs) => (
  blogs.length === 0
    ? undefined
    : blogs.reduce((top, blog) => (
      blog.likes > top.likes
        ? blog
        : top
    ))
)

const mostBlogs = (blogs) => {
  // first reducer returns object {key=author: val=amount of posts}
  const counted = blogs.reduce((acc, blog) => {
    acc[blog.author] = acc[blog.author] + 1 || 1
    return acc
  }, {})
  return Object.keys(counted).reduce((acc, author) => (
    (author === 'undefined' || acc.blogs > counted[author])
      ? acc
      : { author, blogs: counted[author] }), {})
}

const mostLikes = (blogs) => {
  // first reducer returns object {key=author: val=total of likes}
  const likes = blogs.reduce((acc, blog) => {
    acc[blog.author] = acc[blog.author] + blog.likes || blog.likes
    return acc
  }, {})

  return Object.keys(likes).reduce((acc, author) => (
    (author === 'undefined' || acc.likes > likes[author])
      ? acc
      : { author, likes: likes[author] }
  ), {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
