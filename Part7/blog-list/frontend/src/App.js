import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/Login'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { checkLogin } from './reducers/loginReducer'
import { getAll } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(checkLogin())
    dispatch(initializeBlogs())
    dispatch(getAll())
  }, [dispatch])

  return (
    <div>
      <Notification />

      {user === null || !user.loggedIn ?
        <LoginForm  /> :
        <div>
          <Blogs user={user} />
          <Routes>
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App