const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../app'); 
const User = require('../models/user');
const bcrypt = require('bcrypt');

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  })


  afterEach(async () => {
    // Poistetaan kaikki käyttäjät testin jälkeen
    await User.deleteMany({});
  })

  test('should create a new user with valid data', async () => {
    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'securepassword'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.username, newUser.username);
    assert.strictEqual(response.body.name, newUser.name);

    // Verify user was added to the database
    const users = await User.find({});
    assert.strictEqual(users.length, 1);
    assert.strictEqual(users[0].username, newUser.username);
  });

  test('should not create a user with missing username', async () => {
    const newUser = {
      name: 'Invalid User',
      password: 'password'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` is required.');
  });

  test('should not create a user with short username', async () => {
    const newUser = {
      username: 'us',
      name: 'Invalid User',
      password: 'password'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.error, 'User validation failed: username: Path `username` (`us`) is shorter than the minimum allowed length (3).');
  })

  test('should not create a user with short password', async () => {
    const newUser = {
      username: 'validuser',
      name: 'Valid User',
      password: 'pw'
    }

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.error, 'Password must be at least 3 characters long');
  })

  test('should get all users', async () => {
    const user1 = new User({ username: 'user1', name: 'User One', passwordHash: await bcrypt.hash('password1', 10) });
    const user2 = new User({ username: 'user2', name: 'User Two', passwordHash: await bcrypt.hash('password2', 10) });

    await user1.save();
    await user2.save();

    const response = await request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, 2);
    assert.strictEqual(response.body[0].username, 'user1');
    assert.strictEqual(response.body[1].username, 'user2');
  })
})