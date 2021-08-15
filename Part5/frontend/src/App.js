import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addUser = credentials => {
    console.log(credentials);
    setUser(credentials)
  }

  const sendNotification = notification => {
    setNotification(notification)
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const handleLogout = event => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      <Notification notification={notification} />

      {user === null ?
        <LoginForm addUser={addUser} sendNotification={sendNotification} /> :
        <div>
          <Blogs user={user} handleLogout={handleLogout} />
        </div>
      }
    </div>
  )
}

export default App