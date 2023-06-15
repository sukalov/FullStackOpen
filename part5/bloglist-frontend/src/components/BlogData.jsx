import { Heart } from "lucide-react"

const BlogData = ({ blog, like }) => {

    let source
    try {source = blog.url.match(/^[http[s]*:\/\/([a-z0-9.]*)\/?/)[1]}
    catch {source = blog.url}
    return (
        <div className="text-sm -ml-2 -mr-10 rounded-md text-inherit flex justify-between">
            <div className="pl-4">
                <p>source: {source}</p>
                <p>added by {blog.user.name}</p>
            </div>
            <div className="flex gap-1 pr-1.5">
                <span className="font-extralight block text-3xl mt-1 mr-1 dark:text-orange-100">{blog.likes}</span>
                <button onClick={() => {like(blog)}} className="p-1  hover:opacity-50 transition duration-150 dark:text-orange-100">
                    <Heart size={36} strokeWidth={0.6}></Heart>
                </button>
            </div>
        </div>
    )
}

export default BlogData