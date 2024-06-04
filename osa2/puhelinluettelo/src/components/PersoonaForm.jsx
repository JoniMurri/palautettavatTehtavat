import React from "react";

const PersoonaForm = ({ uusiNimi, uusiNumero, kasitteleMuutos, kasitteleLisays }) => {
  return (
    <form onSubmit={kasitteleLisays}>
      <div>
        nimi: <input type='text' name='nimi' value={uusiNimi} onChange={kasitteleMuutos} />
      </div>
      <div>
        numero: <input type='text' name='numero' value={uusiNumero} onChange={kasitteleMuutos} />
      </div>
      <div>
        <button type="submit">Lisää</button>
      </div>
    </form>
  )
}

export default PersoonaForm;