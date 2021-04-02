import axios from 'axios'

const getWeatherData = async capital => {
    const api_key = process.env.REACT_APP_API_KEY

    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
    console.log(response.data);
    return response.data.current
    // return { wind_degree: 12 }
}

export default getWeatherData