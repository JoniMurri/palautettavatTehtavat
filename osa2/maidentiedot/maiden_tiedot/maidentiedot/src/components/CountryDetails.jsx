import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';


const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`;
    axios.get(url).then(response => {
      setWeather(response.data);
    });
  }, [country.capital, api_key]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} width="150" />
      {weather && <Weather weather={weather} />}
    </div>
  )
}

export default CountryDetails;
