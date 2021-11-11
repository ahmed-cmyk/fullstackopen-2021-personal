import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../reducers/loginReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <div className="blog_banner">
        <Link className="spacing" to="/blogs">blogs</Link>
        <Link className="spacing" to="/users">users</Link>
        <span className="spacing">{user.username} logged in</span>
        <span className="spacing">
          <button onClick={handleLogout}>logout</button>
        </span>
      </div>
      <br />
      <h2>blog app</h2>
      <Togglable buttonLabel="create new blog" hideButtonLabel="cancel" class="blogForm">
        <BlogForm user={user} />
      </Togglable>
    </div>
  )
}

export default Blogs