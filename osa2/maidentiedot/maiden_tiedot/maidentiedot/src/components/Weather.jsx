import React from 'react';

const Weather = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <div>temperature: {weather.main.temp}°C</div>
      <div>wind: {weather.wind.speed} m/s</div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
    </div>
  )
}

export default Weather
