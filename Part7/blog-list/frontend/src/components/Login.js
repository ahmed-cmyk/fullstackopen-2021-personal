import React, { useState } from 'react'

import blogReducer from '../reducers/blogReducer'
import loginReducer from '../reducers/loginReducer'
import notificationReducer from '../reducers/notificationReducer'

const Login = ({ addUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginReducer.login({
        username, password
      })
      addUser(user)
      blogReducer.setBlogToken(user.token)
      notificationReducer.sendNotification({ type: 'info', message: 'Logged in' })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationReducer.sendNotification({ type: 'error', message: 'wrong username or password' })
    }
  }

  return (
    <div>
      <h2>log into application</h2>

      <form onSubmit={handleLogin}>
        <div>
                    username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default Login