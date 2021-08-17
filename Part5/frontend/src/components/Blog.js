import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const userAdded = user.username === blog.user.username 
  const addedByUser = { display: userAdded ? '' : 'none' }

  const handleLikeInc = () => {
    const likes = (blog.likes) + 1

    const updatedBlog = {
      ...blog,
      likes
    }

    updateBlog(updatedBlog, blog.id)
  }

  const handleDelete = () => {
    deleteBlog(blog, blog.id)
  }

  return (
    <div className="blog-list">
      {blog.title} {blog.author}
      <Togglable buttonLabel="view" hideButtonLabel="hide">
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleLikeInc}>like</button>
        </div>
        <div>{blog.user.username}</div>
        <button style={addedByUser} onClick={handleDelete}>remove</button>
      </Togglable>
    </div>  
  )
}

export default Blog