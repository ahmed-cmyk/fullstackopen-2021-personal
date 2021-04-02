import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './components/Header'
import SearchFilter from './components/SearchFilter'
import AddPeopleForm from './components/AddPeopleForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([])

  useEffect(() => {
    const eventHandler = response => {
      console.log(response.data);
      setPersons(response.data)
      setFilteredPersons(response.data)
    }

    const promise = axios.get("http://localhost:3001/persons")
    promise.then(eventHandler, [])
  })

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value); 

  const handleSearch = (event) => {
    let searchEntry = (event.target.value).toLowerCase()

    if(searchEntry.length > 0) {
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(searchEntry)))
    } else {
      setFilteredPersons([...persons])
    }
  }

  const checkDuplicatePerson = (person) => {
    if (persons.find(p => p.name === person.name)) {
      return true
    }
    return false
  }

  const concatPersonLists = (personObject) => {
    setPersons(persons.concat(personObject))
    setFilteredPersons(persons.concat(personObject))
  }

  const addPerson = (event) => {
    const alertText = `${newName} already exists in the phonebook`
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    checkDuplicatePerson(personObject) ? alert(alertText) : concatPersonLists(personObject)
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <Header text="Phonebook" />
      <SearchFilter text="filter shown with" handleSearch={handleSearch} />
      <Header text="add a new" />
      <AddPeopleForm 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
        newName={newName} newNumber={newNumber} 
      />
      <Header text="Numbers" />
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App