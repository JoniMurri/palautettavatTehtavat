import { useState } from 'react'

const App = () => {
  const [persoona, asetaPersoona] = useState([ //Alustetaan persoona yhdellä henkilöllä
    {nimi: 'Arto Hellas'}
  ])
  
  // Alustetaan uusiNimi-tila tyhjällä merkkijonolla
  const[uusiNimi, asetaUusiNimi] = useState('')
// Funktio, joka päivittää uusiNimi-tilan käyttäjän syöttämällä arvolla
const kasitteleMuutos = (event) => {
  asetaUusiNimi(event.target.value)
  console.log('uusiNimi:', event.target.value); // Debug-tulostus
}
// Funktio, joka käsittelee lomakkeen lähettämisen
const kasitteleLisays = (event) => {
  event.preventDefault();
   // Tarkistetaan, että uusiNimi ei ole tyhjä merkkijono
  if (uusiNimi.trim() !== '') {
    const nimiOnJoLisatty = persoona.some(henkilo => henkilo.nimi === uusiNimi); // Tarkistetaan, onko uusi nimi jo lisätty henkilöiden joukkoon
    console.log('nimiOnJoLisatty:', nimiOnJoLisatty); // Debug-tulostus
    if (nimiOnJoLisatty) {
      alert(`${uusiNimi} on jo lisätty puhelinluetteloon`);// Jos nimi on jo lisätty, näytetään varoitusviesti
    } else {
        // Jos nimi ei ole vielä lisätty, luodaan uusi henkilö-objekti
      const uusiHenkilo = { nimi: uusiNimi };
      asetaPersoona([...persoona, uusiHenkilo]);
      asetaUusiNimi(''); // Tyhjennä syötekenttä lisäyksen jälkeen
    }
  } else {
    alert('Nimi ei voi olla tyhjä');// Jos uusiNimi on tyhjä, näytetään varoitusviesti
  }
}
 
  return( 
    <div>
      <h2>Puhelinluettelo</h2>
       {/* Lomake, joka kutsuu kasitteleLisays-funktiota lähetyksen yhteydessä */}
      <form onSubmit={kasitteleLisays}>  
        <div>
            {/* Syötekenttä, joka näyttää uusiNimi-tilan ja päivittää sitä kasitteleMuutos-funktion avulla */}
          nimi: <input type='text' value={uusiNimi} onChange={kasitteleMuutos}/>
        </div>
        <div>
          <button type="submit">lisaa</button>
        </div>
      </form>
    
  <h2>Numerot</h2>
   {/* Käydään läpi persoona-tilan henkilöt ja näytetään jokaisen nimi */}
  {persoona.map((henkilo, index) => (
  <h3 key={index}>{henkilo.nimi}</h3>
))}

     
    </div>
  )

}
export default App
