import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    console.log(event)
    event.preventDefault()
    try {
      const user = await dispatch(login({
        username, password
      }))
      console.log(user)
      dispatch(setNotification({ type: 'info', message: 'Logged in' }))
      // setUsername('')
      // setPassword('')
    } catch (exception) {
      dispatch(setNotification({ type: 'error', message: 'wrong username or password' }))
    }
  }

  return (
    <div>
      <h2>log into application</h2>

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
      <button id="login-button" onClick={handleLogin}>login</button>
    </div>
  )
}

export default Login