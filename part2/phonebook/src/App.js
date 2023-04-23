import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Matvey Sokolovsky' },
    { name: 'John Lennon' },
    { name: 'Thelonious Monk' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    console.log(persons.find(p => p.name === newName))
    e.preventDefault();
    if (newName === '' || 
        persons.find(
          p => {
            return p.name === newName
          }
          ) !== undefined) {
      console.log('error')
    }
    else {
    setPersons(oldPersons => [...oldPersons, {name: newName}])
    setNewName('')
  }
  };

  const handleInputChange = (e) => setNewName(e.target.value)

  return (
    <div>
      <h3>Create new contact</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input type='text' onChange={handleInputChange} value={newName}/>
        </div>
        <div>
          <br /><button type="submit">Add person</button>
        </div>
      </form>
      <h2>Contacts</h2>
      {persons.map(person =>
        <div key={person.name}>{person.name}</div>
        )}
    </div>
  )
}

export default App