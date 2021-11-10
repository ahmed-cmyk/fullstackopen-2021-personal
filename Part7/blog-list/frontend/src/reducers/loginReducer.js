import blogService from '../services/blogs'
import loginService from '../services/login'

const loginReducer = (state = {}, action) => {
  switch(action.type) {
  case 'CHECK_LOGIN':
    return action.user
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
    let user = { loggedIn: false, username: null }

    if(window.localStorage.getItem('loggedBlogAppUser')) {
      const localUserItem = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
      const userToken = localUserItem.token
      user.loggedIn = true
      user.username = localUserItem.username
      blogService.setToken(userToken)
    }

    dispatch({
      type: 'CHECK_LOGIN',
      user
    })
  }
}

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    user['loggedIn'] = true
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