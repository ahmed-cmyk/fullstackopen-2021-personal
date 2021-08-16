import React, { useEffect, useState } from 'react';
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blogs = ({ user, handleLogout, sendNotification }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService
          .getAll()
          .then(initialBlogs => {
            setBlogs(initialBlogs)
        })
    }, [])

    const addBlog = blog => {
        setBlogs(blogs.concat(blog))
    }

    return (
        <div>
            <h2>blogs</h2>
            <form onSubmit={handleLogout}>
                {user.username} logged in
                <button type="submit">logout</button>
            </form>
            <BlogForm user={user} addBlog={addBlog} sendNotification={sendNotification} />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Blogs