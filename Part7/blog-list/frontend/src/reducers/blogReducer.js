import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'UPDATE_BLOG':
            return [...state, action.data]
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

export const addBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const updateBlog = (id, updatedContent) => {
    return async dispatch => {
        const blogToChange = {
            ...updatedContent
        }
        const changedBlog = await blogService.update(blogToChange, id)
        dispatch({
            type: 'UPDATE_BLOG',
            data: changedBlog
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
        const response = blogService.deleteBlog(id)
        if(response.status === 204) {

        } else {

        }
        dispatch({
            type: 'DELETE_BLOG',
            data: null
        })
    }
}

export default blogReducer