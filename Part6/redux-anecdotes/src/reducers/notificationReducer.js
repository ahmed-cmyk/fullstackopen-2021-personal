const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_MESSAGE':
            return action.message
        default:
            return state
    }
}

export const setMessage = (content) => {
    return {
        type: 'SET_MESSAGE',
        message: `You voted '${content}'`
    }
}

export default notificationReducer