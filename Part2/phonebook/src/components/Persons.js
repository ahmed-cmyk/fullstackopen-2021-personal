import React from 'react';

import Person from './Person'

const Persons = ({ filteredPersons, deletePerson }) => filteredPersons.map((person, i) => {
    return <Person key={i} person={person} deletePerson={deletePerson} />
})

export default Persons