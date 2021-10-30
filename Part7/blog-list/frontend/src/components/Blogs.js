import React from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ user }) => {
  const blogs = useSelector(state => state.blogs)


  return (
    <div>
      <h2>blogs</h2>
      <form onSubmit={handleLogout}>
        {user.username} logged in
        <button type="submit">logout</button>
      </form>
      <Togglable buttonLabel="create new blog" hideButtonLabel="cancel" ref={blogFormRef} class="blogForm">
        <BlogForm user={user} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
}

export default Blogs