import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { addComment, updateBlog } from '../reducers/blogReducer'

const Blog = () => {
  const [ comment, setComment ] = useState('')
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

  const CommentHandler = async () => {
    console.log('comment', comment)
    const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
    console.log(updatedBlog)
    dispatch(addComment(updatedBlog))
    setComment('')
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
      <h2>comments</h2>
      <input
        type="text"
        id="comment"
        value={comment}
        name="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={CommentHandler}>add comment</button>
      {!blog.comments.length ?
        <div>No comments...</div> :
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      }
    </div>
  )
}

export default Blog