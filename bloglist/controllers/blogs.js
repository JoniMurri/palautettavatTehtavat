
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1, _id:1 }); // Täydennetään käyttäjätiedot

    response.json(blogs);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'user not found' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' });
  }
})
  

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);

    if (blog) {
      response.status(204).end(); // Poiston jälkeen ei palauta sisältöä
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    response.status(400).json({ error: 'Bad Request' });
  }
})

blogsRouter.put('/:id', async (request, response) => {
  console.log('PUT request to /api/blogs/:id')
  console.log('ID:', request.params.id)
  console.log('Request body:', request.body)
  const { id } = request.params
  const { title, author, url, likes, user } = request.body


  const updatedBlog = {
    title,
    author,
    url,
    likes,
    user,
  };

  try {
    const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
    response.json(result);
  } catch (error) {
    response.status(400).json({ error: 'Failed to update blog' });
  }

})



module.exports = blogsRouter;
