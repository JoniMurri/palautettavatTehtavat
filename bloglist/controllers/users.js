const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

//Käyttäjien listaaminen
usersRouter.get('/', async (request, response) => {
    try {
      const users = await User.find({})
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 }); // Täydennetään blogitiedot
  
      response.json(users);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  })

  usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;
  
    if (!password || password.length < 3) {
      return response.status(400).json({
        error: 'password must be at least 3 characters long'
      })
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: 'Username must be unique'
      })
    }


    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    try {
        const savedUser = await user.save();
        response.status(201).json(savedUser);
      } catch (error) {
        response.status(400).json({ error: error.message });
      }
  })
  
  module.exports = usersRouter
