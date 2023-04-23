import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addPerson = (e) => {
    e.preventDefault();
    const filter = persons.find(p => p.name === newName);
    const personsCopy = [...persons]
    const personIndex = persons.indexOf(filter)
    if (filter) {
      if (filter.number === newNumber || (newNumber === '' && newName != '')) {
        alert(`${newName}'s already in contacts with this number`)
    } else if (window.confirm(`Are you sure you want to change the number for ${newName} from ${filter.number} to ${newNumber}`)) {
     personsCopy[personIndex] = {name: filter.name, number: newNumber, id: filter.id}
     setPersons(personsCopy)}
  } else if (newName !== '') {
    setPersons([...persons, {name: newName, number: newNumber, id: persons.length + 1}])
  }
    setNewName('')
    setNewNumber('')
  };

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearch(e.target.value)


  return (
    <div>
      <h1>Phonebook</h1>
      <div>
          search for <input type='text' onChange={handleSearchChange} value={search}/>
      </div>
      <h3>Create new contact</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input type='text' onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input type='text' onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <br /><button type="submit">Add person</button>
        </div>
      </form>
      <h3>Contacts</h3>
      <table>
        <tbody>
          {persons.map(person =>
            <tr key={person.id}>
              <td> {person.name}</td>
              <td> {person.number}</td>
            </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default App