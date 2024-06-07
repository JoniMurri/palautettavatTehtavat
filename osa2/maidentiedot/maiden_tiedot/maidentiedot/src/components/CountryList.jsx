import React from 'react';

const CountryList = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common} <button onClick={() => handleShow(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
