import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import SearchFilter from './components/SearchFilter'
import AddPeopleForm from './components/AddPeopleForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ errorStatus, setErrorStatus ] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(peopleList => {
        console.log("initial data", peopleList);
        setPersons(peopleList)
        setFilteredPersons(peopleList)
      })
  }, [])

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

  const handleNotifications = (message, status) => {
    setErrorMessage(message)
    setErrorStatus(status)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const checkDuplicatePerson = (person) => {
    let foundID = persons.find(p => p.name === person.name) ? (persons.find(p => p.name === person.name)).id : 0 
    if (foundID === 0) {
      return false
    }
    return foundID
  }

  const concatPersonLists = (personObject) => {
    setPersons(persons.concat(personObject))
    setFilteredPersons(persons.concat(personObject))
  }

  const addPerson = (event) => {
    const alertText = `${newName} already exists. Update their phone number?`
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }

    let foundID = checkDuplicatePerson(personObject)
    if(foundID) {
      if(window.confirm(alertText)) {
        personService
          .update(foundID, personObject)
          .then(updatedPerson => {
            handleNotifications(`Changed number of ${personObject.name}`, false)
            setFilteredPersons(filteredPersons.map(person => person.name === newName ? updatedPerson : person))
            setPersons(filteredPersons)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(personList => {
          handleNotifications(`${personObject.name} was added to the list`, false)
          concatPersonLists(personList)
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const deletePerson = (name, id) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
      .deleteObject(id)
      .then(() => {
        handleNotifications(`${name} was removed from the list`, false)
        setFilteredPersons(filteredPersons.filter(person => person.id !== id))
        setPersons(filteredPersons)
      })
      .catch(error => {
        console.log("Caught Error", error);
        handleNotifications(`${name} has already been removed from the list`, true)
        setFilteredPersons(filteredPersons.filter(person => person.id !== id))
        setPersons(filteredPersons)
      })
    } 
  }

  return (
    <div>
      <Notification message={errorMessage} errorStatus={errorStatus} />
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App