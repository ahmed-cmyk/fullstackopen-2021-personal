import React, { useEffect, useState } from 'react';

import getWeatherData from '../services/WeatherStack'

const WeatherDetails = ({ capital }) => {
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

export default WeatherDetails