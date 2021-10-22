const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_MESSAGE':
            return action.message
        case 'REMOVE_MESSAGE':
            return action.message
        default:
            return state
    }
}

export const setMessage = (message, time) => {
    return async dispatch  => {
        dispatch({
            type: 'SET_MESSAGE',
            message
        })

        setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE',
                message: ''
            })    
        }, time * 1000)
    }
}

export default notificationReducer