import React from 'react';

const Person = ({ persoona, poistaHenkilo }) => {
    console.log(persoona)
    return (
      <li>
        {persoona.nimi} {persoona.numero}
        <button onClick={() => poistaHenkilo(persoona.id)}>poista</button>

      </li>
    );
  };

export default Person;