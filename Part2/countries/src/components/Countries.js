import React from 'react';

import Country from './Country'

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

export default Countries