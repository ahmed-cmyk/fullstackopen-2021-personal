import React, { useEffect, useState } from 'react';
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blogs = ({ user, handleLogout }) => {
    const [blogs, setBlogs] = useState([])

    const createBlog = (title, author, url) => {
        const blog = {title, author, url}
    }

    useEffect(() => {
        blogService
          .getAll()
          .then(initialBlogs => {
            setBlogs(initialBlogs)
          })
      }, [])

    return (
        <div>
            <h2>blogs</h2>
            <form onSubmit={handleLogout}>
                {user.username} logged in
                <button type="submit">logout</button>
            </form>
            <BlogForm />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Blogs