import React, { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Header = ({ text }) => <h2>{text}</h2>
const Body = ({ text }) => <>{text}</>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  let highestVotes = votes.indexOf(Math.max.apply(null, votes))

  const nextAnecdote = () => {setSelected(Math.floor(Math.random() * 6))}
  const incrementVote = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Body text={anecdotes[selected]}/>
      <br />
      <Body text={`has ${votes[selected]} votes`}/>
      <br />
      <Button handleClick={nextAnecdote} text="next anecdote"/>
      <Button handleClick={incrementVote} text="vote"/>
      <br />
      <Header text="Anecdote with the most votes" />
      <Body text={anecdotes[highestVotes]}/>
    </div>
  )
}

export default App