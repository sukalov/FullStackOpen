import { useState } from "react"
import BlogData from "./BlogData"
import { ArrowDownNarrowWide, Trash2, X } from "lucide-react"
import blogServices from "../services/blogs"

const Blog = ({ blog, like, user, eventHappened, errorHappened }) => {
  const [expanded, setExpanded] = useState(false)

  const deleteBlog = () => {
    
  }
  
  return (
    <div className="relative my-2 sm:mx-2 pl-2 pr-10 py-1 border rounded-lg border-stone-300 dark:border-stone-500  bg-white dark:bg-neutral-600 shadow-md shadow-orange-150">
      <a className="focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-orange-300 focus-visible:ring-offset-1 dark:ring-offset-stone-600 group focus-visible:transition focus-visible:duration-300 ease-in-out" href={blog.url}>
        <span className="dark:text-neutral-50 font-semibold bg-left-bottom bg-gradient-to-r from-stone-900 to-stone-900 dark:from-stone-100 dark:to-stone-100 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-150 ease-out pb-0.5">
          {blog.title}
        </span>
      </a>
      <span className="dark:text-stone-200 text-sm font-light dark:font-light">
        <br />by {blog.author}
      </span>
      <div className="absolute flex top-0 right-1">
        {user.username === blog.user.username &&
        <button onClick={deleteBlog} className="py-1 hover:opacity-50 transition duration-150 dark:text-orange-100">
           <Trash2 size={40} strokeWidth={0.5} />
        </button>
        }
        <button onClick={() => {setExpanded(prev => !prev)}} className="hover:opacity-50 transition duration-150 dark:text-orange-100">
          {expanded
          ? <X size={48} strokeWidth={0.5} />
          : <ArrowDownNarrowWide size={48} strokeWidth={0.5}/>
          }
        </button>
      </div>
      {expanded && <BlogData blog={blog} like={like} />}
    </div>  
  )}
  
  export default Blog