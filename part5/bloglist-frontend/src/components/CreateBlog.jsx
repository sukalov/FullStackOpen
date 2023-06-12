import blogServices from "../services/blogs"

const CreateBlog = ({ blogs, setBlogs, eventHappened, errorHappened }) => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const input = { title: e.target[0].value, url: e.target[1].value, author: e.target[2].value }
            const response = await blogServices.create(input)
            setBlogs(prev => ([...prev, response]))
            eventHappened('new blog added succesfully')
        } catch (err) {
            errorHappened('failed to add new blog')
        }
    }
    return (
        <form onSubmit={handleSubmit} className="px-4 sm:px-8 py-6 rounded-md bg-orange-50 dark:bg-stone-600 shadow-xl dark:shadow-stone-900 flex mx-6 sm:mx-auto flex-1 flex-col items-stretch max-w-xl mb-10">
        <h3 className="dark:text-orange-50 my-1 text-neutral-600 block mx-auto">
            add blogs to the collection
        </h3>
        <div className="input-grid">
            <label htmlFor="title">
                <p className="dark:text-orange-50 my-1 text-neutral-600">
                    title
                </p>
            </label>
            <div className="relative">
                <input className="px-2 dark:bg-neutral-600 dark:border dark:border-stone-500 w-full block border border-stone-300  dark:shadow-lg p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-0 dark:focus-visible:ring-orange-300 dark:text-orange-50 focus-visible:transition focus-visible:duration-300 ease-in-out"
                id="title"
                type="text"
                required
                autoComplete="off"
            />
            </div>
        </div>
        <div>
            <label htmlFor="url">
                <p className="dark:text-orange-50 my-1 text-neutral-600">
                    url
                </p>
            </label>
            <div className="relative">
                <input className="px-2 dark:bg-neutral-600 dark:border dark:border-stone-500 w-full block border border-stone-300  dark:shadow-lg p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-0 dark:focus-visible:ring-orange-300 dark:text-orange-50 focus-visible:transition focus-visible:duration-300 ease-in-out"
                id="url"
                type="url"
                required
                autoComplete="off"
            />
            </div>
        </div>
        <div>
        <label htmlFor="author">
                <p className="dark:text-orange-50 mb-1 mt-2 text-neutral-600 ">
                    author
                </p>
            </label>
            <input
                className="px-2 dark:bg-neutral-600 dark:border dark:border-stone-500 w-full block border border-stone-300  dark:shadow-lg p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-0 dark:focus-visible:ring-orange-300 dark:text-orange-50 focus-visible:transition focus-visible:duration-300 ease-in-out"
                id="author"
                required
                autoComplete="off"
            />
        </div>
        <button className=" bg-orange-400 dark:bg-amber-600 px-4 py-2 mt-6 text-center text-sm font-semibold inline-block text-white cursor-pointer uppercase transition duration-200 ease-in-out rounded-md  hover:bg-orange-600 dark:hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-amber-600 focus-visible:ring-offset-2 dark:ring-offset-stone-600 active:scale-95 max-w-xs mx-auto" type="submit" >add blog</button>
    </form>
    )
}

export default CreateBlog