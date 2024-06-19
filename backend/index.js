const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('dist'))


// Lisää Morgan token näyttämään pyynnön rungon
morgan.token('body', (req) => JSON.stringify(req.body));

// Konfiguroidaan Morgan loggaamaan HTTP-pyyntöjen data ja mukana tuleva runko
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



let persons = [
  { id: 1, name: 'John Doe', number: '123-456-7890' },
  { id: 2, name: 'Jane Smith', number: '987-654-3210' }
];

// Endpoint to get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// Endpoint for info page
app.get('/info', (req, res) => {
  const currentTime = new Date();
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentTime}</p>
  `);
});

// Endpoint to get a single person by id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// Endpoint to delete a person by id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

// Endpoint to add a new person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number is missing' });
  }

  const existingPerson = persons.find(person => person.name === body.name);
  if (existingPerson) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const person = {
    id: Math.floor(Math.random() * 10000), // Generate a random id
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);
  res.json(person);
});

// Error handling middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
