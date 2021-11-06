let timeId = 0

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
  case 'REMOVE_NOTIFICATION':
    return action.message
  default:
    return state
  }
}

export const setNotification = (message) => {
  return dispatch => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        message: null
      })
    }, 5000)

    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
  }
}

export default notificationReducer