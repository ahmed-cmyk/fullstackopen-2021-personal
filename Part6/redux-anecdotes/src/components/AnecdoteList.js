import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { incrementVote } from '../reducers/anecdoteReducer';
import { removeMessage, setMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    let list = useSelector(({ anecdotes }) => anecdotes.sort((a, b) => {
        return b.votes - a.votes
    }))

    if(filter) {
        list = list.filter(anecdote => anecdote.content.includes(filter))
    }

    const anecdoteList = list
    
    const vote = (anecdote) => {
        dispatch(incrementVote(anecdote))
        dispatch(setMessage(`you voted '${anecdote.content}'`, 10))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList