import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogsBlock from './components/BlogsBlock'
import Login from './components/Login'
import login from './services/login'
import TopPanel from './components/TopPanel'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const tokenFromLocal = window.localStorage.getItem('token')
    if (tokenFromLocal) {
      setUser({ 
        token: tokenFromLocal,
        username: window.localStorage.getItem('username'),
        name: window.localStorage.getItem('name')
       })
       blogService.setToken(tokenFromLocal)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({ username, password })
      setUser(user)
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('username', user.username)
      window.localStorage.setItem('name', user.name)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (err)
    {console.log(err);}
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('name')
    blogService.setToken(null)
    setUser(null)
}

  return (
    <main className={mode ? 'light' : 'dark'}>
      <div className='bg-white dark:bg-stone-800 relative border border-transparent min-h-screen p-0'>
        <TopPanel setMode={setMode} mode={mode} logout={logout} user={user}/>
        {!user 
          ? <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
          : 
          <div>
            <BlogsBlock user={user} blogs={blogs} />
            <CreateBlog blogs={blogs} setBlogs={setBlogs} />
          </div>
        }
      </div>
    </main>
  )
}

export default App