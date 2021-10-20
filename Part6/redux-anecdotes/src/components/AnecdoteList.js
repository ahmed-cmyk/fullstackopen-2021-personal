import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { incrementVote } from '../reducers/anecdoteReducer';
import { setMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch()
    useSelector(state => console.log('check state', state.anecdotes))
    const anecdoteList = useSelector(({ anecdotes }) => anecdotes.sort((a, b) => {
        return b.votes - a.votes
    }))
    
    const vote = (id, content) => {
        dispatch(incrementVote(id))
        dispatch(setMessage(content))
    }

    return(
        <div>
            {anecdoteList.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList