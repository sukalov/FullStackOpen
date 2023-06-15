import Blog from "./Blog"
import Skeleton from './Skeleton'
import blogServices from '../services/blogs'

const BlogsBlock = ({ user, blogs, setBlogs, eventHappened, errorHappened, logout }) => {

    const like = async blog => {
        try {
            const newBlog = {...blog}
            newBlog.likes += 1
            newBlog.user = newBlog.user.id
            const response = await blogServices.update(newBlog)
            const newBlogs = blogs.filter(el => el.id !== response.id)
            setBlogs([...newBlogs, response])
            eventHappened('liked!')
        } catch (err) {
            if (err.response.data?.error === 'token expired') {
                logout()
                errorHappened('token expired, login required')
            } else {
                errorHappened('failed to like')
        }}
    }
    return (  
        <article className="px-4 sm:px-8 py-6 rounded-md bg-orange-50 dark:bg-stone-600 shadow-xl dark:shadow-stone-900 flex mx-6 sm:mx-auto flex-1 flex-col items-stretch max-w-xl my-16 dark:text-neutral-100 font-light dark:font-extralight">
            <h2 className='text-stone-800 text-3xl font-bold dark:text-orange-200'>
                blogs
            </h2>
            <span>
                Hello, {user.name}!
            </span>
            <div className='my-4'>
            {blogs.length > 0 ?
            blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
                <Blog key={blog.id} blog={blog} like={like} user={user} eventHappened={eventHappened} errorHappened={errorHappened} />
            ) :
            <Skeleton />
            }
            </div>
        </article>
    )
}

export default BlogsBlock