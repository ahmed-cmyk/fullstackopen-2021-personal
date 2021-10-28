const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
        case 'REMOVE_NOTIFICATION':
            return action.message
        default:
            return state
    }
}

export const setNotification = (message, messageType) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            messageType,
            message
        })
    }
}

export const removeNotification = () => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            messageType: null,
            message: null
        })
    }
}

export default notificationReducer