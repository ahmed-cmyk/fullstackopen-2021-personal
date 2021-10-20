const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = {
  anecdotes: [
    {content: 'If it hurts, do it more often', id: getId(), votes: 0},
    {content: 'Adding manpower to a late software project makes it later!', id: getId(), votes: 0},
    {content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', id: getId(), votes: 0},
    {content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', id: getId(), votes: 0},
    {content: 'Premature optimization is the root of all evil.', id: getId(), votes: 0}, 
    {content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', id: getId(), votes: 0}  
  ],
  notification: '',
  filter: ''
}

const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INC_VOTE':
        const id = action.data.id
        console.log('state now', state)
        const anecdoteToIncrement = state.find(a => a.id === id)
        const changedAnecdote = {
          ...anecdoteToIncrement,
          votes: anecdoteToIncrement.votes + 1
        }
        return state.map(anecdote => 
         anecdote.id !== id ? anecdote : changedAnecdote
        )
    case 'ADD_ANECDOTE':
        return [...state.anecdotes, action.data]
    default:
      return state
  }
}

export const incrementVote = (id) => {
  return {
    type: 'INC_VOTE',
    data: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer