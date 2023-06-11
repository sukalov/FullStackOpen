const Blog = ({ blog }) => (
    <div className="">
      <span className="font-semibold dark:font-bold">{blog.title}</span> <span className="italic dark:text-stone-400">by {blog.author}</span>
    </div>  
  )
  
  export default Blog