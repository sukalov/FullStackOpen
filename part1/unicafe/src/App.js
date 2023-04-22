import './App.css';
import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
)};

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => { // well, i can skip task 1.8 cause this component's already here
  const sum = good + bad + neutral
  let average;
    sum === 0 ? average = 0 :
    average = (good - bad) / (sum);

  let positive;
    sum === 0 ? positive = 0 :
    positive = good / (sum) * 100;

  if (sum === 0) return <p>No feedback given</p>

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={positive + '%'} />
      </tbody>
    </table>
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