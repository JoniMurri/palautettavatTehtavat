


const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { id: 1, nimi: 'Arto Hellas', numero: '040-123456' },
  { id: 2, nimi: 'Ada Lovelace', numero: '39-44-5323523' },
  { id: 3, nimi: 'Dan Abramov', numero: '12-43-234345' },
  { id: 4, nimi: 'Mary Poppendieck', numero: '39-23-6423122' }
]

app.get('/api/persons',  (request, response) => {
  response.json(persons);
})

app.get('/info', (request, response) => {
    const date = new Date(); 
    const info = `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>
    `
    response.send(info);
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
  
    if (person) {
      response.json(person);
    } else {
      response.status(404).send({ error: 'Person not found' });
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const personExists = persons.find(person => person.id === id);
  
    if (personExists) {
      persons = persons.filter(person => person.id !== id);
      response.status(204).end();
    } else {
      response.status(404).send({ error: 'Person not found' });
    }
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body;
  
    if (!body.nimi || !body.numero) {
      return response.status(400).json({
        error: 'name or number is missing'
      });
    }
  
    const nameExists = persons.some(person => person.nimi === body.nimi);
    if (nameExists) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
  
    const newPerson = {
      id: Math.floor(Math.random() * 1000000),
      nimi: body.nimi,
      numero: body.numero,
    };
  
    persons = persons.concat(newPerson);
    response.json(newPerson);
  });
  

const PORT = process.env.Port || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})