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
      <div className="bg-blue-300	p-5">
        <Link className="p-2" to="/blogs">blogs</Link>
        <Link className="p-2" to="/users">users</Link>
        <span className="p-2 text-blue-700">{user.username} logged in</span>
        <span className="p-2 border-solid border-4 border-light-blue-500">
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