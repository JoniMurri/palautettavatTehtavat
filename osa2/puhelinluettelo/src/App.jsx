import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersoonaForm from './components/PersoonaForm';
import Persoonat from './components/Persoonat';
import puhelinServices from './services/puhelinServices';
import Notification from './components/Notifications';


const App = () => {
  const [persoona, asetaPersoona] = useState([]);
  const [uusiNimi, asetaUusiNimi] = useState('');
  const [uusiNumero, asetaUusiNumero] = useState('');
  const [suodatus, asetaSuodatus] = useState('');
  const [naytaKaikki, asetaNaytaKaikki] = useState(true);
  const [ilmoitus, asetaIlmoitus] = useState({ message: null, type: '' });
  
  useEffect(() => {
    puhelinServices.getAll()
      .then(data => {
        asetaPersoona(data);
      })
      .catch(error => {
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
    const henkilo = persoona.find(henkilo => henkilo.nimi === uusiNimi);
    if (henkilo) { // Tarkistetaan oikein onko henkilö olemassa
      if (window.confirm(`${uusiNimi} on jo lisätty puhelinluetteloon, haluatko korvata vanhan numeron uudella?`)) {
        const paivitettyHenkilo = { ...henkilo, numero: uusiNumero }; // Päivitetty henkilö oikeilla tiedoilla
        puhelinServices
          .update(henkilo.id, paivitettyHenkilo)
          .then(paivitettyHenkilo => {
            
            asetaPersoona(persoona.map(h => h.id !== henkilo.id ? h : paivitettyHenkilo));
            asetaUusiNimi('');
            asetaUusiNumero('');
            console.log('Updated person:', paivitettyHenkilo);
          })
          .catch(error => {
            console.error('Error occurred:', error);
          });
      }
    } else {
      const uusiHenkilo = { nimi: uusiNimi, numero: uusiNumero };
      console.log(uusiHenkilo)
      puhelinServices.create(uusiHenkilo)
      .then(uusiHenkilo => {
        // Tarkistetaan, että uusi henkilö saa ID:n palvelimelta
        if (!uusiHenkilo.id) {
          console.error('Uudella henkilöllä ei ole ID:tä:', uusiHenkilo);
          return;
        }
          asetaPersoona([...persoona, uusiHenkilo]);
          asetaUusiNimi('');
          asetaUusiNumero('');
          asetaIlmoitus({ message: `Henkilön ${uusiHenkilo.nimi} numero päivitettiin`, type: 'success' });
          setTimeout(() => {
            asetaIlmoitus({ message: null, type: '' });
          }, 5000);
         }) .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };

  const suodatetutHenkilot = naytaKaikki
  ? persoona
  : persoona.filter(henkilo =>
      henkilo && (henkilo.nimi.toLowerCase().includes(suodatus.toLowerCase()) || henkilo.id.includes(suodatus))
    )
    const poistaHenkilo = (id) => {
        if (window.confirm("Haluatko varmasti poistaa henkilön?")) {
          puhelinServices
            .poista(id)
            .then(() => {
              asetaPersoona(persoona.filter(henkilo => henkilo.id !== id));
            });
        }
      };

   
      
  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={ilmoitus.message} type={ilmoitus.type} />
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
      <Persoonat suodatetutHenkilot={suodatetutHenkilot} poistaHenkilo={poistaHenkilo} />
    </div>
  );
}

export default App;
