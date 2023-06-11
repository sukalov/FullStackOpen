const Login = ({ user, username, setUsername, password, setPassword, handleLogin }) => {
    return (
    <div className="flex h-screen items-center p-2">
        <form onSubmit={handleLogin} className="px-8 py-6 rounded-md bg-orange-50 dark:bg-stone-600 shadow-2xl dark:shadow-xl flex mx-auto flex-1 flex-col items-stretch max-w-sm">
            <div className="input-grid">
                <label for="username">
                    <p className="dark:text-orange-50 my-1 text-neutral-600">
                        username
                    </p>
                </label>
                <div className="relative">

                    <input className="px-2 dark:bg-neutral-700 w-full block border border-stone-300 dark:border-stone-800 p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-0 dark:focus-visible:ring-orange-300 dark:text-orange-50"
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    required
                    autoComplete="off"
                />
                </div>
            </div>
            <div>
            <label for="password">
                    <p className="dark:text-orange-50 mb-1 mt-2 text-neutral-600 ">
                        password
                    </p>
                </label>
                <input
                    className="px-2 dark:bg-neutral-700 border  border-stone-300 dark:border-stone-800 w-full p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-orange-300 focus-visible:ring-offset-0 dark:text-orange-50"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    required
                />
            </div>
            <button className=" bg-orange-400 dark:bg-amber-600 px-4 py-2 mt-6 text-center text-sm font-semibold inline-block text-white cursor-pointer uppercase transition duration-200 ease-in-out rounded-md  hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 dark:focus-visible:ring-amber-600 focus-visible:ring-offset-2 dark:ring-offset-stone-600 active:scale-95" type="submit" >login</button>
        </form>
    </div>
    )
}

export default Login