import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog}) => (
  <div className="blog-list">
    {blog.title} {blog.author}
    <Togglable buttonLabel="view" hideButtonLabel="hide">
      <div>{blog.url}</div>
      <div>
        {blog.likes}
        <button>like</button>
      </div>
      <div>{blog.user.username}</div>
    </Togglable>
  </div>  
)

export default Blog