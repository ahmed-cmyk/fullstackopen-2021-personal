import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const sendNotification = message => {
    setNotification(message)
  }

  return (
    <div>
      <Notification notification={notification} />

      {user === null ?
        <LoginForm addUser={addUser} sendNotification={sendNotification} /> :
        <div>
          <h3> Hello, {user.username}</h3>
          <Blogs />
        </div>
      }
    </div>
  )
}

export default App