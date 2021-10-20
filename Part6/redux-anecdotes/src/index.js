import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

import { store } from './store'
import { addAnecdote } from './reducers/anecdoteReducer'
import { removeMessage } from './reducers/notificationReducer'
import { setFilter } from './reducers/filterReducer'

store.dispatch(addAnecdote('A new anecdote'))
store.dispatch(removeMessage())
store.dispatch(setFilter(''))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)