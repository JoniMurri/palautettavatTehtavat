const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const Person = require('./models/person'); // Person-mallin importtaus

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('dist'));


const url = process.env.MONGODB_URI;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
  

// Lisää Morgan token näyttämään pyynnön rungon
morgan.token('body', (req) => JSON.stringify(req.body));

// Konfiguroidaan Morgan loggaamaan HTTP-pyyntöjen data ja mukana tuleva runko
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// Endpoint to get all persons
app.get('/api/persons', (req, res, next) => {
    Person.find({})
      .then(persons => {
        res.json(persons);
      })
      .catch(error => next(error));
  });

// Endpoint for info page
app.get('/info', (req, res, next) => {
    Person.countDocuments({})
      .then(count => {
        const currentTime = new Date();
        res.send(`
          <p>Phonebook has info for ${count} people</p>
          <p>${currentTime}</p>
        `);
      })
      .catch(error => next(error));
  });

// Endpoint to get a single person by id
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
      .then(person => {
        if (person) {
          res.json(person);
        } else {
          res.status(404).end();
        }
      })
      .catch(error => next(error));
  });

// Endpoint to delete a person by id
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        if (result) {
          res.status(204).end();
        } else {
          res.status(404).end();
        }
      })
      .catch(error => next(error));
  });

// Endpoint to add a new person
app.post('/api/persons', (req, res, next) => {
    const { name, number } = req.body
  
    const person = new Person({
        name,
        number
      });
   
  

        // Tallennetaan henkilö tietokantaan
        person.save()
          .then(savedPerson => {
            res.json(savedPerson);
          })
          .catch(error => next(error));
      
  });

// Endpoint to update a person's number
app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body;
  
    if (!name || !number) {
      return res.status(400).json({ error: 'name or number is missing' });
    }
  
    const updatedPerson = {
      name,
      number
    };
  
    Person.findByIdAndUpdate(
      req.params.id,
      updatedPerson,
      { new: true, runValidators: true, context: 'query' }
    )
      .then(updatedPerson => {
        if (updatedPerson) {
          res.json(updatedPerson);
        } else {
          res.status(404).send({ error: 'Person not found' });
        }
      })
      .catch(error => next(error));
  });
  



// Error handling middleware
const errorHandler = (error, req, res, next) => {
    console.error(error.message);
  
    if (error.name === 'ValidationError') {
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
