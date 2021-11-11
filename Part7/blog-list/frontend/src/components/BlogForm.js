import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useField from '../hooks'

import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [ title, titleReset ] = useField('text')
  const [ author, authorReset ] = useField('text')
  const [ url, urlReset ] = useField('text')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <form id="blogForm" onSubmit={createBlog}>
      <h2>create</h2>
      <div>title: <input className="border-2 border-solid border-blue-300 rounded-md p-1" { ...title } /></div>
      <div>author: <input className="border-2 border-solid border-blue-300 rounded-md p-1" { ...author } /></div>
      <div>url: <input className="border-2 border-solid border-blue-300 rounded-md p-1" { ...url } /></div>
      <span className="border-2 border-solid border-blue-400 rounded-md p-1 bg-blue-300 text-white my-2">
        <button className="submitButton" type="submit">create</button>
      </span>
    </form>
  )
}

export default BlogForm