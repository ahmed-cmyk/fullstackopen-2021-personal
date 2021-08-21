import React, { useEffect, useState, useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blogs = ({ user, handleLogout, sendNotification }) => {
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async () => {
      const returnedBlogs = await blogService.getAll()
      setBlogs(sortBlogs(returnedBlogs))
    }
    getBlogs()
  }, [])

  const addBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      sendNotification({
        type: 'info',
        message: `a new blog "${blog.title}" by ${user.username} added`
      })
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()
    } catch(exception) {
      sendNotification({
        type: 'error',
        message: 'Error occured. Please try again'
      })
    }
  }

  const findAndUpdateBlog = (updatedBlog) => {
    return(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const sortBlogs = (unsortedBlogs) => {
    const sortedBlogs = unsortedBlogs.sort((a, b) => b.likes - a.likes)

    return sortedBlogs
  }

  const updateBlog = async (blog, id) => {
    const updatedBlog = await blogService.update(blog, id)
    const updatedBlogs = findAndUpdateBlog(updatedBlog)

    setBlogs(sortBlogs(updatedBlogs))
  }

  const deleteBlog = async (blog, id) => {
    if (window.confirm(`Do you want to delete the blog ${blog.title} by ${blog.author}`)) {
      try {
        const response = await blogService.deleteBlog(id)

        if (response === 204) {
          const updatedBlogs = blogs.filter(blog => blog.id !== id)
          setBlogs(sortBlogs(updatedBlogs))
          sendNotification({
            type: 'info',
            message: 'Blog deleted'
          })
        }
      } catch (exception) {
        sendNotification({
          type: 'error',
          message: 'Blog delete failed'
        })
      }
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <form onSubmit={handleLogout}>
        {user.username} logged in
        <button type="submit">logout</button>
      </form>
      <Togglable buttonLabel="create new blog" hideButtonLabel="cancel" ref={blogFormRef} class="blogForm">
        <BlogForm user={user} addBlog={addBlog} sendNotification={sendNotification} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default Blogs