import React from 'react';

const Person = ({ henkilo }) => {
  return (
    <li>
      {henkilo.nimi} {henkilo.numero}
    </li>
  )
}

export default Person;