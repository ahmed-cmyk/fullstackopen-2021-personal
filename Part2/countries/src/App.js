import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
      setFilteredCountries(response.data)
    })
  }, [])

  const setFilteredList = (country) => () => {
    setFilteredCountries(country)
  }

  const searchHandler = (event) => {
    let searchEntry = (event.target.value).toLowerCase()

    if(searchEntry.length > 0) {
      setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(searchEntry)))
      // console.log(weatherData);
    } else {
      setFilteredCountries([...countries])
    }
  }

  return (
    <div>
      <div>find countries <input type='text' onChange={searchHandler} /></div>
      <Countries countryList={filteredCountries} setFilteredList={setFilteredList} />
    </div>
  )
}

export default App;
