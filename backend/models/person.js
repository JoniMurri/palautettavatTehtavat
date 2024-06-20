const mongoose = require('mongoose');


const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  })



const personSchema = new mongoose.Schema({
    name: {
        type: String,
         required: true,
    minlength: [3, 'Name must be at least 3 characters long'] 
      },
      number: {
        type: String,
        required: true
      } 
});



personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
