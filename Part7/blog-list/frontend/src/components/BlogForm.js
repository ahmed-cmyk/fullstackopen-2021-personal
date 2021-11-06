import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const createBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      user,
      url,
      likes: 0
    }
    dispatch(addBlog(blog, user))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form id="blogForm" onSubmit={createBlog}>
      <h2>create</h2>
      <div>
                title:
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
                author:
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
                url:
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button className="submitButton" type="submit">create</button>
    </form>
  )
}

export default BlogForm