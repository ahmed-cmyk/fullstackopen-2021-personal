import React, { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, value }) => {
  return (  
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ stats }) => {

  const [good, neutral, bad, all, average, positive] = stats

  if(all) {
    return (
      <table>
        <tbody>
          <Statistic text={good.text} value={good.score} />
          <Statistic text={neutral.text} value={neutral.score} />
          <Statistic text={bad.text} value={bad.score} />
          <Statistic text={all.text} value={all.score} />
          <Statistic text={average.text} value={average.score} />
          <Statistic text={positive.text} value={positive.score} />
        </tbody>
      </table>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const stats = [
    {
      'text': 'good',
      'score': good
    },
    {
      'text': 'neutral',
      'score': neutral
    },
    {
      'text': 'bad',
      'score': bad
    },
    {
      'text': 'all',
      'score': total
    },
    {
      'text': 'average',
      'score': ((good - bad)/total) ? ((good - bad)/total) : 0
    },
    {
      'text': 'positive',
      'score': ((good * 100)/total) ? ((good * 100)/total) : 0
    },
  ]

  const calcTotal = () => {
    setTotal(total + 1)
  }

  const incrementGood = () => {
    setGood(good + 1)
    calcTotal()
  }

  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    calcTotal()
  }

  const incrementBad = () => {
    setBad(bad + 1)
    calcTotal()
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={incrementGood} text='good' />
      <Button handleClick={incrementNeutral} text='neutral' />
      <Button handleClick={incrementBad} text='bad' />
      <br />
      <Header text="statistics" />
      <Statistics stats={stats} />
      <br />
    </div>
  )
}

export default App