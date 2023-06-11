const LogoutButton = ({ logout }) => {
    return (
        <button onClick={logout} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-orange-300 focus-visible:ring-offset-2 dark:ring-offset-stone-800 dark:text-orange-100 right-0 text-sm m-3 hover:opacity-50 transition duration-200 ease-in-out cursor-pointer uppercase border border-neutral-900 hover:border-opacity-50 dark:border-orange-100 dark:hover:border-opacity-50 p-2 rounded-md">
            log out
        </button>
    )
}

export default LogoutButton