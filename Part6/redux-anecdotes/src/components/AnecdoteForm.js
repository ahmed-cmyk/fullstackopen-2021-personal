import React from 'react';
import { connect } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(content)
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    { addAnecdote }
)(AnecdoteForm)