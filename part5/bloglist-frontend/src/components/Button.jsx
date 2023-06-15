const Button = ({ onClick,  text}) => {
    return (
        <button onClick={onClick} className="isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-orange-300 focus-visible:ring-offset-2 dark:ring-offset-stone-800 dark:text-orange-100 right-0 text-sm my-3 hover:opacity-80 transition duration-300 ease-in-out cursor-pointer uppercase hover:border-opacity-40 dark:border-orange-100 hover:bg-orange-100 dark:hover:border-opacity-50 px-4 py-2 rounded-md dark:hover:bg-stone-700">
            {text}
        </button>
    )
}

export default Button