import './App.css';
import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
)};

const Statistics = ({good, bad, neutral}) => {
  let average;
    good + bad + neutral === 0 ? average = 0 :
    average = (good - bad) / (good + bad + neutral);

  let positive;
    good + bad + neutral === 0 ? positive = 0 :
    positive = good / (good + bad + neutral) * 100;
  return (
    <div>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>give us feedback</h2>
        <Button handleClick={handleGood} text='good' />
        <Button handleClick={handleNeutral} text='neutral' />
        <Button handleClick={handleBad} text='bad' />
        <h2>sattistics</h2>
        <Statistics good={good} bad={bad} neutral={neutral} />
      </header>
    </div>
  )
}

export default App