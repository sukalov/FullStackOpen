import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogsBlock from './components/BlogsBlock'
import Login from './components/Login'
import login from './services/login'
import ModeToggle from './components/ModeToggle'

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

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({ username, password })
      setUser(user)
      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('username', user.username)
      window.localStorage.setItem('name', user.name)

      setUsername('')
      setPassword('')
    } catch (err)
    {console.log(err);}
  }

  return (
    <main className={mode ? 'light' : 'dark'}>
      <div className='bg-white dark:bg-stone-800 relative min-h-screen'>
        <ModeToggle setMode={setMode} mode={mode} />
        {user 
          ? <BlogsBlock user={user} blogs={blogs} />
          : <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>
        }
      </div>
    </main>
  )
}

export default App