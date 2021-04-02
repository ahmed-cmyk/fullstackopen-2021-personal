import React, { useEffect, useState } from 'react'
import axios from 'axios'

const WeatherDetails = ({ capital }) => {
  console.log("I render")
  const [ weatherData, setWeatherData ] = useState()

  useEffect(() => {
    getWeatherData(capital).then(data => {
      console.log('data', data);
      setWeatherData(data)
    })
  }, [capital])

  if(weatherData === undefined) {
    return (
      <p>Loading weather data...</p>
    )
  } else {
    return(
      <>
        <h2>Weather in {capital}</h2>
        <p><b>temperature:</b> {weatherData.temperature} Celcius</p>
        <img src={weatherData.weather_icons[0]} alt={capital} />
        <p><b>wind:</b> {weatherData.wind_speed} direction {weatherData.wind_dir}</p>
      </>
    )
  }
}

const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width='90px' alt={`${country.name} flag`} />
      <WeatherDetails capital={country.capital} />
    </>
  )
}

const Country = ({ country, listLength }) => {
  let viewDetails = listLength === 1 ? true: false

  if(viewDetails) {
    return(
      <CountryDetails country={country} />
    )
  } else {
    return(
      <>
        {country.name}
      </>
    )
  }
  
}

const Countries = ({ countryList, setFilteredList }) => {
  let viewDetails = countryList.length === 1 ? false: true

  if(countryList.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    return (
      <div>
        {countryList.map((country, index) => {
          return(
            <span key={index+1000}>
              <Country key={country.name}
                country={country} 
                listLength={countryList.length}
              />
              {viewDetails && <button key={index} id='button' onClick={setFilteredList([country])}>show</button>}
              <br key={index+500} />
            </span>
          )}
        )}
      </div>
    )
  }
}

const getWeatherData = async capital => {
  const api_key = process.env.REACT_APP_API_KEY

  const response = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
  console.log(response.data);
  return response.data.current
  // return { wind_degree: 12 }
}

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
