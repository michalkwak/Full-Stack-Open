import { useState } from 'react'

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
    <li>{props.name} {props.number}</li>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map((person, index) =>
        <Person key={index} name={person.name} number={person.number} />
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(newName + ` is already added to phonebook`)
      return
    }
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
        <PhonebookForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
        <Persons persons={persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))} />
    </div>
  )
}

export default App