import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import BlogsBlock from './components/BlogsBlock'
import Login from './components/Login'
import login from './services/login'
import TopPanel from './components/TopPanel'
import CreateBlog from './components/CreateBlog'
import Alert from './components/Alert'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('light')
  const [event, setEvent] = useState(null)

  useEffect(() => {
    try {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
  } catch (err) {
    console.log(err)
  }}, [])

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
    if (window.localStorage.getItem('mode')) setMode(window.localStorage.getItem('mode'))
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
    } catch (err) {
      errorHappened(err.response.data.error)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('name')
    blogService.setToken(null)
    setUser(null)
}

const errorHappened = (err) => {
  setEvent({ message: err, status: 'bad' })
  setTimeout(() => setEvent(null), 3800)
}

const eventHappened = (err) => {
  setEvent({ message: err, status: 'good' })
  setTimeout(() => setEvent(null), 3800)
}

  return (
    <main className={mode}>
      <div className='bg-white dark:bg-stone-800 border border-transparent min-h-screen w-full p-0 fixed'>
        </div>
        <div className='relative border border-transparent min-h-screen p-0'>
        <TopPanel setMode={setMode} mode={mode} logout={logout} user={user}/>
        {!user 
          ? <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} errorHappened={errorHappened}/>
          : 
          <div>
            <BlogsBlock user={user} blogs={blogs} />
            <CreateBlog blogs={blogs} setBlogs={setBlogs} eventHappened={eventHappened} errorHappened={errorHappened}/>
          </div>
        }
        {event && <Alert event={event}/>}
      </div>
    </main>
  )
}

export default App