import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      console.log('data', action.data)
      return action.data
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'INC_VOTE':
        const id = action.data.id
        const anecdoteToIncrement = state.find(a => a.id === id)
        const changedAnecdote = {
          ...anecdoteToIncrement,
          votes: anecdoteToIncrement.votes + 1
        }
        return state.map(anecdote => 
         anecdote.id !== id ? anecdote : changedAnecdote
        )
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addAnecdote = (newAnecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(newAnecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote
    })
  }
}

export const incrementVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.incrementVotes(anecdote)
    dispatch({
      type: 'INC_VOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer