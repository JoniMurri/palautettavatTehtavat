import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  const handleShow = (name) => {
    const country = countries.find(country => country.name.common === name);
    setSelectedCountry(country);
  };

  const filteredCountries = filter === ''
    ? []
    : countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div>
      <h1>Country Info</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {filteredCountries.length > 10 && <div>Too many matches, specify another filter</div>}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <CountryList countries={filteredCountries} handleShow={handleShow} />
      )}
      {filteredCountries.length === 1 && <CountryDetails country={filteredCountries[0]} />}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
