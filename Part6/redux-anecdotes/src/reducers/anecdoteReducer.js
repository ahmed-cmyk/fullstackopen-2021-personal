const getId = () => (100000 * Math.random()).toFixed(0)

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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const addAnecdote = ({ content, id, votes }) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content,
      id,
      votes
    }
  }
}

export const incrementVote = (id) => {
  return {
    type: 'INC_VOTE',
    data: { id }
  }
}

export default anecdoteReducer