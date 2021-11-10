import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { updateBlog } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state =>
    state.blogs ?
      state.blogs.find(blog => blog.id === id) :
      null
  )

  const dispatch = useDispatch()

  const LikesHandler = async () => {
    const likes = (blog.likes) + 1
    const updatedBlog = { ...blog, likes }
    dispatch(updateBlog(updatedBlog))
  }

  if(!blog) {
    return null
  }

  return (
    <div className="blogDetails">
      <h2 className="blogTitle">{blog.title}</h2>
      <a href={blog.url} className="blogUrl">{blog.url}</a>
      <div className="blogLikes">
        <span className="blogLikes_number">{blog.likes}</span>
        <button className="blogLikes_button" onClick={LikesHandler}>like</button>
      </div>
      <div>added by {blog.author}</div>
    </div>
  )
}

export default Blog