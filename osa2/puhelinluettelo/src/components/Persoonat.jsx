import React from "react";
import  Person from "./Person";


  const Persoonat= ({suodatetutHenkilot }) => {
    return (
      <ul>
        {suodatetutHenkilot.map((henkilo, index) => (
          <Person key={index} henkilo={henkilo} />
        ))}
      </ul>
    )
  }

  export default Persoonat