import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import { setBlogToken } from './reducers/blogReducer'
import { checkLogin } from './reducers/loginReducer'
import { setUser } from './reducers/userReducer'

let user = null

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const loggedUserJSON = dispatch(checkLogin())
    console.log(loggedUserJSON)
    if(loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      dispatch(setBlogToken(user.token))
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