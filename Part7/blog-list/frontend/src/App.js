import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import { setBlogToken } from './reducers/blogReducer'
import { checkLogin } from './reducers/loginReducer'
import { setUser } from './reducers/usersReducer'

let user = null

const App = () => {
  const dispatch = useDispatch()
  user = useSelector(state => state.login)
  useEffect((user) => {
    dispatch(checkLogin())
    if(user) {
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