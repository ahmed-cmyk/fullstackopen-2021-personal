import React from 'react';

import CountryDetails from './CountryDetails'

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

export default Country