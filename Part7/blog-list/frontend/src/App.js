import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import blogReducer from './reducers/blogReducer'
import { checkLogin } from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

let user = null

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedUserJSON = dispatch(checkLogin())
    console.log(loggedUserJSON)
    if(loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      userReducer.setReducer(user)
      blogReducer.setBlogToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification />

      {user === null ?
        <LoginForm  /> :
        <div>
          <Blogs user={user} />
        </div>
      }
    </div>
  )
}

export default App