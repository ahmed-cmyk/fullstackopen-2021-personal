import React, { useEffect, useState } from 'react';
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService
          .getAll()
          .then(initialBlogs => {
            setBlogs(initialBlogs)
          })
      }, [])

    return (
        <div>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Blogs