import Blog from "./Blog"

const BlogsBlock = ({ blogs, user }) => {
    return (  
        <div className="p-3 dark:text-orange-50">
        <h2 className='text-gray-900 text-3xl font-bold dark:text-orange-200'>blogs</h2>
        <span>Hello, {user.name}!</span>
        <div className='m-4'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
}

export default BlogsBlock