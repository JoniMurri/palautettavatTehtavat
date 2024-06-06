import React from "react";
import  Person from "./Person";


const Persoonat = ({ suodatetutHenkilot, poistaHenkilo }) => {
  console.log(suodatetutHenkilot)
  return (
    <ul>
      {suodatetutHenkilot.map(persoona => 
      <Person
          key={persoona.id}
          persoona={persoona}
          poistaHenkilo={() => poistaHenkilo(persoona.id)}
        />
      )}
    </ul>
  );
};


  export default Persoonat