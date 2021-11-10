import usersService from '../services/users'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.user
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const getAll = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    console.log('found users', users)
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export default userReducer