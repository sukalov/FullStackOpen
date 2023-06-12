const Blog = ({ blog }) => (
    <div className="relative">
      <a className="focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-orange-300 focus-visible:ring-offset-1 dark:ring-offset-stone-600 group focus-visible:transition focus-visible:duration-300 ease-in-out" href={blog.url}>
        <span className="dark:text-neutral-50 font-semibold dark:font-bold bg-left-bottom bg-gradient-to-r from-stone-900 to-stone-900 dark:from-stone-100 dark:to-stone-100 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-150 ease-out">
          {blog.title}
        </span>
      </a>
      <span className="italic text-stone-600 dark:text-stone-400">
        &nbsp;by {blog.author}
      </span>
    </div>  
  )
  
  export default Blog