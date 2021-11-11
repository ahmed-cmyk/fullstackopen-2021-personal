import React from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import { addComment, updateBlog } from '../reducers/blogReducer'
import useField from '../hooks'
import BlogComments from './BlogComments'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const [ comment, commentReset ] = useField('text')
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
    if(comment.value) {
      const updatedBlog = { ...blog, comments: blog.comments.concat(comment.value) }
      dispatch(addComment(updatedBlog))
      dispatch(setNotification({ message: `New comment "${comment.value}" was added`, type: 'info' }))
      commentReset()
    } else {
      dispatch(setNotification({ message: 'Comment field cannot be empty', type: 'error' }))
    }
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
        <span className="border-2 border-solid border-blue-400 rounded-md p-1 bg-blue-300 text-white">
          <button className="blogLikes_button" onClick={LikesHandler}>like</button>
        </span>
      </div>
      <div>added by {blog.author}</div>
      <h2>comments</h2>
      <input className="border-2 border-solid border-blue-300 rounded-md py-2 px-6" { ...comment } />
      <span className="border-2 border-solid border-blue-400 rounded-md p-3 bg-blue-300 text-white">
        <button onClick={CommentHandler}>add comment</button>
      </span>
      <BlogComments blog={blog} />
    </div>
  )
}

export default Blog