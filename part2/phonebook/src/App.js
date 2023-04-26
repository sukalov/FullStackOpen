import { useState, useEffect } from 'react'
import axios from 'axios'

import ContactList from './components/ContactList'
import CreateContact from './components/CreateContact'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
         .then(response =>{
          setPersons(response.data)
         })
  },[])

  const addPerson = (e) => {
    e.preventDefault();
    const filter = persons.find(p => p.name === newName);
    const personsCopy = [...persons]
    const personIndex = persons.indexOf(filter)
    if (filter) {
      if (filter.number === newNumber || newNumber === '') {
        alert(`${newName}'s already in contacts with this number`)
    } else if (window.confirm(`Are you sure you want to change the number for ${newName} from ${filter.number} to ${newNumber}`)) {
     personsCopy[personIndex] = {name: filter.name, number: newNumber, id: filter.id}
     setPersons(personsCopy)}
  } else {
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
        <Filter handler={handleSearchChange} value={search} />
        <CreateContact addPerson={addPerson}
                       name={newName} 
                       handlerName={handleNameChange}
                       number={newNumber}
                       handlerNumber={handleNumberChange}
                        />
        <ContactList   persons={persons} search={search} />
    </div>
  )
}

export default App