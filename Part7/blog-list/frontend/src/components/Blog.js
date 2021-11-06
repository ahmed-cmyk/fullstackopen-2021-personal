import React from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './Togglable'
import { updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  if(blog === undefined) {
    return null
  }

  const userAdded = user.username === blog.user.username
  const addedByUser = { display: userAdded ? '' : 'none' }

  const dispatch = useDispatch()

  const LikesHandler = async () => {
    const likes = (blog.likes) + 1
    const updatedBlog = { ...blog, likes }
    dispatch(updateBlog(updatedBlog))
  }

  const handleDelete = () => {

  }

  return (
    <div className="blogDetails">
      <div>
        <span className="blogTitle">{blog.title}</span>
        <span className="blogAuthor">{blog.author}</span>
      </div>
      <Togglable buttonLabel="view" hideButtonLabel="hide" class="blogExpDetails">
        <div className="blogUrl">{blog.url}</div>
        <div className="blogLikes">
          <span className="blogLikes_number">{blog.likes}</span>
          <button className="blogLikes_button" onClick={LikesHandler}>like</button>
        </div>
        <div>{blog.user.username}</div>
        <button id="delete_button" style={addedByUser} onClick={handleDelete}>remove</button>
      </Togglable>
    </div>
  )
}

export default Blog