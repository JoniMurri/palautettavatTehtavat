import React from "react";



const Filter = ({ suodatus, kasitteleMuutos }) => {
    return (
      <div>
        Rajaa nimiä: <input type='text' name='suodatus' value={suodatus} onChange={kasitteleMuutos} />
      </div>
    )
  }
  
  export default Filter;