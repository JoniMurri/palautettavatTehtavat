import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();



const url = process.env.MONGODB_URI

if (!url) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }



// Yhdistä MongoDB-tietokantaan
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Yhdistetty MongoDB-tietokantaan')
  })
  .catch((error) => {
    console.error('Virhe yhdistettäessä MongoDB-tietokantaan:', error.message)
  })

  // Luo Mongoose-malli
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  // Tarkista komennon argumentit
if (process.argv.length === 3) {
    // Listaa kaikki henkilöt
    Person.find({}).then(result => {
      console.log('Puhelinluettelo:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  } else if (process.argv.length === 5) {
    // Lisää uusi henkilö
    const name = process.argv[3];
    const number = process.argv[4];
  
    const person = new Person({
      name: name,
      number: number,
    })
        person.save().then(() => {
    console.log(`Lisättiin ${name} numero ${number} puhelinluetteloon`);
    mongoose.connection.close()
  })
}
else {
  console.log('virhe!');
  process.exit(1);
}
