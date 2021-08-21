import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const userAdded = user.username === blog.user.username
  const addedByUser = { display: userAdded ? '' : 'none' }

  const LikesHandler = () => {
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
      <div>
        <span className="blogTitle">{blog.title}</span>
        <span className="blogAuthor">{blog.author}</span>
      </div>
      <Togglable buttonLabel="view" hideButtonLabel="hide" class="blogExpDetails">
        <div className="blogUrl">{blog.url}</div>
        <div className="blogLikes">
          {blog.likes}
          <button className="blogLikes_button" onClick={LikesHandler}>like</button>
        </div>
        <div>{blog.user.username}</div>
        <button style={addedByUser} onClick={handleDelete}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog