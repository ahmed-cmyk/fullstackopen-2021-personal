import React from 'react'
import { useDispatch } from 'react-redux'
import useField from '../hooks'

import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()

  const [ username, usernameReset ] = useField('text')
  const [ password, passwordReset ] = useField('text')

  const handleLogin = async (event) => {
    console.log(event)
    event.preventDefault()
    try {
      dispatch(login({
        username: username.value,
        password: password.value
      }))
      dispatch(setNotification({ type: 'info', message: 'Logged in' }))
      usernameReset()
      passwordReset()
    } catch (exception) {
      dispatch(setNotification({ type: 'error', message: 'wrong username or password' }))
    }
  }

  return (
    <div>
      <h2>log into application</h2>
      <div>username <input { ...username } /></div>
      <div>password <input { ...password } /></div>
      <button id="login-button" onClick={handleLogin}>login</button>
    </div>
  )
}

export default Login