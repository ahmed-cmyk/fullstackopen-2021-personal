import React, { useEffect, useState, useRef } from 'react';
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable';
import blogService from '../services/blogs'

const Blogs = ({ user, handleLogout, sendNotification }) => {
    const [blogs, setBlogs] = useState([])

    const blogFormRef = useRef()

    useEffect(() => {
        blogService
          .getAll()
          .then(initialBlogs => {
            setBlogs(initialBlogs)
        })
    }, [])

    const addBlog = blog => {
        setBlogs(blogs.concat(blog))
        blogFormRef.current.toggleVisibility()
    }

    return (
        <div>
            <h2>blogs</h2>
            <form onSubmit={handleLogout}>
                {user.username} logged in
                <button type="submit">logout</button>
            </form>
            <Togglable buttonLabel="create new blog" hideButtonLabel="cancel" ref={blogFormRef}>
                <BlogForm user={user} addBlog={addBlog} sendNotification={sendNotification} />
            </Togglable>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Blogs