import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import services from './services';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    services
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.log('Error fetching data:', error)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }
  const showNotification = (message, isError = false) => {
    setNotification(message, isError);

    setTimeout(() => {
      setNotification(null);
    }, 5000); 
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already in the phonebook. Replace the old number with a new one?`
      );
      
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newPhoneNumber };
        
        services.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName('');
            setNewPhoneNumber('');
            showNotification(`Updated ${returnedPerson.name}'s number successfully.`);
          })
          .catch(error => {
            console.error('Error updating person:', error.message || error);
            alert('Failed to update person. Please check the server and network settings.');
            showNotification('Failed to update person. Please check the server and network settings.',true);
          })
      }
    } else {
      const newPerson = { name: newName, number: newPhoneNumber };
      
      services.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewPhoneNumber('');
          showNotification(`Added` + returnedPerson.name + `s number successfully.`);
      })
        .catch(error => {
          console.error('Error adding person:', error.message || error);
          alert('Failed to add person. Please check the server and network settings.');
          showNotification('Failed to add person. Please check the server and network settings.',true);
        })
    }
  }
  
   

   
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      services.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification(`Delete person` + name + `successfully`)
        })
        .catch(error => {
          console.error('Error deleting person:', error.message || error);
          alert('Failed to delete person. Please check the server and network settings.',true);
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <Notification message={notification} isError={notification?.isError} />
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Lisää uusi</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <h3>Numerot</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}




export default App
