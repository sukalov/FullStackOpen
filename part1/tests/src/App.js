import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const [ tf, setTF] = useState(true);
  
  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
  const toggleTF = () => setTF(!tf)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}> 
        zero
      </button>
      <div>{String(tf)}</div>
      <button onClick={toggleTF}>toggle</button>
    </div>
  )
}

export default App