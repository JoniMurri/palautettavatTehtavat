import React from 'react';

const PersonForm = ({ addPerson, newName, handleNameChange, newPhoneNumber, handlePhoneNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        nimi: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        numero: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default PersonForm
