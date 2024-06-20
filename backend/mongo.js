const mongoose = require('mongoose');
require('dotenv').config();

// Käsitellään komentoriviparametrit
const name = process.argv[2];
const number = process.argv[3];

// Yhteysosoite MongoDB Atlakseen
const url = process.env.MONGODB_URI;

// Yhdistetään MongoDB:hen
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model('Person', personSchema);

// Jos komentorivillä on nimi ja numero, lisätään uusi henkilö
if (process.argv.length === 4) {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
// Jos komentorivillä ei ole nimeä ja numeroa, listataan kaikki henkilöt
else if (process.argv.length === 2) {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
// Jos komentoriviparametrit ovat virheelliset, annetaan ohjeet
else {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  console.log('Or to add a person: node mongo.js <password> <name> <number>');
  process.exit(1);
}
