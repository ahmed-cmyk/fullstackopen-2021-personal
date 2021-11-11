import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'ADD_COMMENT':
  case 'UPDATE_BLOG': {
    const updatedBlogList = state.map((blog) => {
      return blog.id === action.data.id ? action.data : blog
    })
    return updatedBlogList
  }
  case 'DELETE_BLOG': {
    const postDeleteList = state.filter(blog => blog.id !== action.data.id)
    return postDeleteList
  }
  case 'FAILED':
  case 'SET_TOKEN':
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    const notification = {
      message: `a new blog "${newBlog.title}" by ${user.username} added`,
      info: 'info'
    }
    dispatch(setNotification(notification))
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog, blog.id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const addComment = (blog) => {
  return async dispatch => {
    await blogService.addComment(blog, blog.id)
    dispatch({
      type: 'ADD_COMMENT',
      data: blog
    })
  }
}

export const setBlogToken = (token) => {
  return dispatch => {
    blogService.setToken(token)
    dispatch({
      type: 'SET_TOKEN',
      data: ''
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      const response = await blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: response.data
      })
    } catch(exception) {
      dispatch(setNotification({ message: 'Error occured. Delete request failed', type: 'error' }))
    }
  }
}

export default blogReducer