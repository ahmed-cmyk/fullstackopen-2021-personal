import React from 'react';

import WeatherDetails from './WeatherDetails'

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

export default CountryDetails