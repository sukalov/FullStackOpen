import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import BlogsBlock from './components/BlogsBlock'
import Login from './components/Login'
import TopPanel from './components/TopPanel'
import CreateBlog from './components/CreateBlog'
import Alert from './components/Alert'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState('light')
  const [event, setEvent] = useState(null)
  const createBlogRef = useRef()

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

  const logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('name')
    blogService.setToken(null)
    setUser(null)
    setEvent(null)
}

const errorHappened = (err) => {
  setEvent({ message: err, status: 'bad' })
  setTimeout(() => setEvent(null), 2800)
}

const eventHappened = (err) => {
  setEvent({ message: err, status: 'good' })
  setTimeout(() => setEvent(null), 2800)
}

  return (
    <main className={mode}>
      <div className='bg-white dark:bg-stone-800 border border-transparent min-h-screen w-full min-w-xs p-0 fixed h-full'>
        </div>
        <div className='relative border border-transparent min-h-screen p-0'>
        <TopPanel setMode={setMode} mode={mode} logout={logout} user={user} ref={createBlogRef} />
        {!user 
          ? <Login setUser={setUser} errorHappened={errorHappened}/>
          : 
          <div>
            <CreateBlog blogs={blogs} setBlogs={setBlogs} eventHappened={eventHappened} errorHappened={errorHappened} ref={createBlogRef} />
            <BlogsBlock user={user} setBlogs={setBlogs} logout={logout} blogs={blogs} setEvent={setEvent} event={event} eventHappened={eventHappened} errorHappened={errorHappened} s />
          </div>
        }
        {event && <Alert event={event} setEvent={setEvent}/>}
      </div>
    </main>
  )
}

export default App