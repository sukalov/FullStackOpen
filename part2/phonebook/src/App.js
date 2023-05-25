import React, { useState, useEffect, Suspense } from 'react'
import dbServices from './services/dbService'
import filterAndSend from './services/newContact'
import CreateContact from './components/CreateContact'
import Filter from './components/Filter'
import Notification from './components/Notification'

const ContactList = React.lazy(() => import("./components/ContactList"));

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState({message: null})

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
        setMessage({message: `Action completed succesfully!`, status: 'good'})
        setNewName('')
        setNewNumber('')
      }).then(
        setTimeout(() => setMessage({message: null}), 3000)
      )
      .catch(e => console.log(e))
  };

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleSearchChange = e => setSearch(e.target.value)

  return (
    <div className='main'>
      <h1>Phonebook</h1>
      <Notification message={message.message} status={message.status}/>
        <Filter handler={handleSearchChange} value={search} />
        <CreateContact addPerson={addPerson}
                       name={newName} 
                       handlerName={handleNameChange}
                       number={newNumber}
                       handlerNumber={handleNumberChange}
                        />
        <Suspense fallback={<p>Contacts are loading...</p>}>
          <ContactList  persons={persons}
                        search={search}
                        set={setPersons}
                        setMessage={setMessage} />
        </Suspense>
    </div>
  )
}

export default App