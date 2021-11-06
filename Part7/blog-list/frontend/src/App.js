import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import { initializeBlogs } from './reducers/blogReducer'
import { checkLogin } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(checkLogin())
    dispatch(initializeBlogs())
  }, [dispatch])

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