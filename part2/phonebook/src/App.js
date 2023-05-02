import { useState, useEffect } from 'react'
import dbServices from './services/dbService'
import ContactList from './components/ContactList'
import CreateContact from './components/CreateContact'
import Filter from './components/Filter'
import filterAndSend from './services/newContact'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    dbServices.getAll()
         .then(response =>{
          setPersons(response)
         })
  },[])

  const addPerson = e => {
    e.preventDefault();
    filterAndSend(persons, newName, newNumber, setPersons)
      .then(res => {
        setNewName('')
        setNewNumber('')
      })
      .catch(e => console.log(e))
  };

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleSearchChange = e => setSearch(e.target.value)

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
        <ContactList   persons={persons}
                       search={search}
                       set={setPersons} />
    </div>
  )
}

export default App