import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

import { store } from './store'
import { addAnecdote } from './reducers/anecdoteReducer'
import { setMessage } from './reducers/notificationReducer'

store.dispatch(addAnecdote('A new anecdote'))
store.dispatch(setMessage(''))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)