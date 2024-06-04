import React, { useEffect } from 'react';
import { useState } from 'react';
import Filter from './components/Filter';
import PersoonaForm from './components/PersoonaForm';
import Persoonat from './components/Persoonat';
import lisaaServices from './services/puhelinServices'

const App = () => {
  const [persoona, asetaPersoona] = useState([]);
  const [uusiNimi, asetaUusiNimi] = useState('');
  const [uusiNumero, asetaUusiNumero] = useState('');
  const [suodatus, asetaSuodatus] = useState('');
  const [naytaKaikki, asetaNaytaKaikki] = useState(true);
  
  
  useEffect(() => {
    lisaaServices.getAll().then(data => {
      asetaPersoona(data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const kasitteleMuutos = (event) => {
    const { name, value } = event.target;
    if (name === 'nimi') {
      asetaUusiNimi(value);
    } else if (name === 'numero') {
      asetaUusiNumero(value);
    } else if (name === 'suodatus') {
      asetaSuodatus(value);
    }
  };

  const kasitteleLisays = (event) => {
    event.preventDefault();
    const nimiOnJoLisatty = persoona.some(henkilo => henkilo.nimi === uusiNimi)
    if(nimiOnJoLisatty){
      alert(`${uusiNimi} on jo lisätty puhelinluetteloon`)
    } else{
      const uusiHenkilo = {nimi: uusiNimi, numero: uusiNumero}
    
    lisaaServices
      .create(uusiHenkilo)
      .then(response => {
        asetaPersoona([...persoona, response.data])
        asetaUusiNimi('')
        asetaUusiNumero('')
      
    })
  }
}

const suodatetutHenkilot = naytaKaikki
? persoona
: persoona.filter(henkilo => 
    henkilo && henkilo.nimi && henkilo.nimi.toLowerCase().includes(suodatus.toLowerCase())
    
  );

  return (
    <div>
    <h2>Puhelinluettelo</h2>
    <Filter suodatus={suodatus} kasitteleMuutos={kasitteleMuutos} />
    <PersoonaForm
      uusiNimi={uusiNimi}
      uusiNumero={uusiNumero}
      kasitteleMuutos={kasitteleMuutos}
      kasitteleLisays={kasitteleLisays}
    />
   
  <button onClick={() => asetaNaytaKaikki(!naytaKaikki)}>
        näytä {naytaKaikki ? 'kaikki' : 'suodatetut'}
      </button>
      <Persoonat suodatetutHenkilot={suodatetutHenkilot} />
      </div>
  )

}

export default App;
