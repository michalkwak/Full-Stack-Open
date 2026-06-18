import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.filter} onChange={(event) => props.setFilter(event.target.value)} />
    </div>
  )
}

const PhonebookForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={(event) => props.setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={(event) => props.setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = (props) => {
  return (
    <li>{props.name} {props.number} <button onClick={() => props.deletePerson(props.id)}>delete</button></li>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map((person) =>
        <Person 
          key={person.id}
          id={person.id} 
          name={person.name} 
          number={person.number} 
          deletePerson={props.deletePerson} />
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(newName + ` is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        personService
          .update(person.id, { ...person, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotification({ message: `Updated ${newName}'s number`, type: 'success' })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
      return
    }

    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification({ message: `Added ${newName}`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification({ message: `Deleted ${person.name}`, type: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification({ message: `Information of ${person.name} has already been removed from server`, type: 'error' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }
  
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
        <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
        <PhonebookForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
        <Persons persons={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))} deletePerson={deletePerson} />      
    </div>
  )
}

export default App