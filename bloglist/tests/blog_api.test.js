const { test, before, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const mongoUrl = process.env.TEST_MONGODB_URI

before(async () => {
    //yhdistäminen tietokantaan 
    await mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnfiedTopology: true})
})

beforeEach(async ()=> {
    //poista kaikki blogit testien alusssa
    await Blog.deleteMany({})

    const blog1 = new Blog({ title: 'Blog 1', author: 'Author 1', url: 'http://example.com/1', likes: 2 });
    const blog2 = new Blog({ title: 'Blog 2', author: 'Author 2', url: 'http://example.com/2', likes: 3 });
    await blog1.save();
    await blog2.save();
})

after(async () => {
    // Sulje MongoDB-yhteys testien jälkeen
    await mongoose.connection.close();
  })

  describe('GET /api/blogs', () => {
    test('should return all blogs in JSON format', async () => {
      const response = await request(app).get('/api/blogs');
      
      // Tarkista HTTP-status
      assert.strictEqual(response.status, 200);
    
      // Tarkista, että vastaus on JSON-muodossa
      assert.match(response.headers['content-type'], /json/);
      
      // Tarkista, että saatiin oikea määrä blogeja
      assert.strictEqual(response.body.length, 2); // Oletetaan, että lisättiin 2 blogia beforeEach:ssa
      
      // Tarkista, että saatujen blogien tiedot ovat oikeat
      assert.strictEqual(response.body[0].title, 'Blog 1');
      assert.strictEqual(response.body[1].title, 'Blog 2');
    })

    test('should return blogs with id field instead of _id', async () => {
        const response = await request(app).get('/api/blogs');
        
        response.body.forEach(blog => {
          assert.ok(blog.id);
          assert.strictEqual(blog._id, undefined);
        })
    })
})

describe('POST /api/blogs', () => {
    test('should add a new blog and increase the number of blogs by one', async () => {
      const newBlog = {
        title: 'New Blog',
        author: 'New Author',
        url: 'http://newblog.com',
        likes: 10
      };
  
      const initialBlogs = await Blog.find({});
      const initialCount = initialBlogs.length;
  
      const response = await request(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect('Content-Type', /json/)
        .expect(201);
  
      const finalBlogs = await Blog.find({});
      const finalCount = finalBlogs.length;
  
      assert.strictEqual(finalCount, initialCount + 1);
      assert.strictEqual(response.body.title, newBlog.title);
      assert.strictEqual(response.body.author, newBlog.author);
      assert.strictEqual(response.body.url, newBlog.url);
      assert.strictEqual(response.body.likes, newBlog.likes);
    })
  })
  describe('DELETE /api/blogs/:id', () => {
    test('should delete a blog and return status 204', async () => {
      const blogsBefore = await Blog.find({});
      const blogToDelete = blogsBefore[0]; // Poistetaan ensimmäinen blogi
  
      await request(app)
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);
  
      const blogsAfter = await Blog.find({});
      assert.strictEqual(blogsAfter.length, blogsBefore.length - 1);
      const deletedBlog = await Blog.findById(blogToDelete._id);
      assert.strictEqual(deletedBlog, null);
    })
    test('should return 404 if the blog does not exist', async () => {
        await request(app)
          .delete('/api/blogs/605c72ef7e8a4c001f4b3e6f') 
          .expect(404);
      })
    })

