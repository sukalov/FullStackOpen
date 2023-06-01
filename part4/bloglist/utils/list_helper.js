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
  const likes = blogs.reduce((acc, blog) => {
    acc[blog.author] = acc[blog.author] + 1 || 1
    return acc
  }, {})
  return Object.keys(likes).reduce((acc, author) => (
    (toString(author) === 'undefined' && acc.blogs > likes[author])
      ? acc
      : { author, blogs: likes[author] }), {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
