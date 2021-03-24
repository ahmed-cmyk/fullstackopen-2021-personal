import React from 'react';

import Person from './Person'

const Persons = ({ filteredPersons }) => filteredPersons.map(person => <Person key={person.name} person={person} /> )

export default Persons