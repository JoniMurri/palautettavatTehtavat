import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null) 
  
 

  


 


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      // Fetch blogs from the server
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      setMessage({ text: `Welcome back ${user.name}!`, type: 'success' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      
      
    } catch (exception) {
     setMessage({ text: 'Wrong username or password', type:'error'})
     setTimeout(() => {
      setMessage(null)
     },5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setBlogs([])
    setMessage({ text: 'Logged out successfully', type: 'success' })
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage({ text: `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added`, type: 'success' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception){
      console.error('Error adding blog:',exception)
      
    }
    }
    const updateBlogList = (updatedBlog) => {
      if (updatedBlog === null) {
        setBlogs(blogs.filter(b => b.id !== updatedBlog.id));
      } else {
        setBlogs(blogs.map(b => (b.id !== updatedBlog.id ? b : updatedBlog)));
      }
    }

    const showNotification = (text, type) => {
      setMessage({ text, type })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)




  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
     
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
    
      <BlogForm createBlog={addBlog} />
      
      {sortedBlogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogList={updateBlogList}
          showNotification={showNotification}
          user={user}
        />
      ))}
      

    </div>
  )
}

export default App