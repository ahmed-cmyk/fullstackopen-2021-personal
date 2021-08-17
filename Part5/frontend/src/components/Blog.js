import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog }) => {
  const incLikes = () => {
    const likes = (blog.likes) + 1

    const updatedBlog = {
      ...blog,
      likes
    }
    console.log(updatedBlog);

    updateBlog(updatedBlog, blog.id)
  }

  return (
    <div className="blog-list">
      {blog.title} {blog.author}
      <Togglable buttonLabel="view" hideButtonLabel="hide">
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={incLikes}>like</button>
        </div>
        <div>{blog.user.username}</div>
      </Togglable>
    </div>  
  )
}

export default Blog