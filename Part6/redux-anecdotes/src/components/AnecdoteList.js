import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { incrementVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.sort((a, b) => {
        return b.votes - a.votes
    }))
    
    const vote = (id) => {
        dispatch(incrementVote(id))
    }

    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList