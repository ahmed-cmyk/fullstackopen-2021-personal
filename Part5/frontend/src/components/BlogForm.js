import React, { useState } from 'react';
import blogService from '../services/blogs'

const BlogForm = ({ user, addBlog, sendNotification }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = async (event) => {
        event.preventDefault()

        try {
            const newBlog = {
                title,
                author,
                user,
                url,
                likes: 0
            }
    
            const blog = await blogService.create(newBlog)
            addBlog(blog)
            sendNotification({
                type: 'info',
                message: `a new blog "${blog.title}" by ${user.username} added`
            })
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch(exception) {
            sendNotification({
                type: 'error',
                message: "Error occured. Please try again"
            })
        }
    }

    return (
        <form onSubmit={createBlog}>
            <h2>create</h2>
            <div>
                title:
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm