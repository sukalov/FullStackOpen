import Blog from "./Blog"

const BlogsBlock = ({ blogs, user }) => {
    return (  
        <article className="mb-8 mt-24 p-4 px-12 max-sm:px-8 py-6 rounded-md bg-orange-50 dark:bg-stone-600 shadow-xl dark:shadow-stone-900 flex mx-6 sm:mx-auto flex-1 flex-col items-stretch max-w-xl">
            <h2 className='text-stone-800 text-3xl font-bold dark:text-orange-200'>blogs</h2>
            <span className="dark:text-neutral-100 font-light dark:font-extralight">Hello, {user.name}!</span>
            <div className='m-4'>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            </div>
        </article>
    )
}

export default BlogsBlock