import blogService from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'CHECK_LOGIN':
    return action.loggedIn
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const checkLogin = () => {
  return dispatch => {
    dispatch({
      type: 'CHECK_LOGIN',
      loggedIn: window.localStorage.getItem('loggedBlogAppUser')
    })
  }
}

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    console.log('login details', user)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      user
    })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

export default loginReducer