import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogHome from './components/BlogHome'
import BlogList from './components/BlogList'
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
          <BlogHome user={user} />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App