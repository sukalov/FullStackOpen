import './App.css';
import { useState } from 'react'

const Anecdote = ({text}) => <div className='quote-block'>{text}</div>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    `If you don't know where you are going, any road will take you there.`,
    `Education is a progressive discovery of our own ignorance.`,
    `Walking on water and developing software from a specification are easy if both are frozen.`,
    `Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.`,
    `Java is to JavaScript what Car is to Carpet.`,
    `Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.`,
    `In order to understand recursion, one must first understand recursion.`
  ]

  let initialPoints = anecdotes.map(el => 0);
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initialPoints);

  const newQuote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);
    while (randomIndex === selected) { // in this case our button always gives a new quote
      randomIndex = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomIndex)
  }

  const vote = () => {
    const newPoints = [...points]
    newPoints[selected] ++
    setPoints(newPoints)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="quote-parent">
          <Anecdote text={anecdotes[selected]} />
          <p>has {points[selected]} votes</p>
        </div>
        <Button handleClick={newQuote} text='next anecdote' />
        <Button handleClick={vote} text='vote' />
      </header>
    </div>
  );
}

export default App;


