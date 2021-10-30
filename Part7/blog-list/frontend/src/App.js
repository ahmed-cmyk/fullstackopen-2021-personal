import React, { useState, useEffect } from 'react'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import blogReducer from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogReducer.setBlogToken(user.token)
    }
  }, [])

  const addUser = credentials => {
    setUser(credentials)
  }

  return (
    <div>
      <Notification notification={notification} />

      {user === null ?
        <LoginForm addUser={addUser}  /> :
        <div>
          <Blogs user={user} />
        </div>
      }
    </div>
  )
}

export default App