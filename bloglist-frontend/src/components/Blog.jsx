import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateBlogList, showNotification, user }) => {
  const  [visible, setVisible] = useState(false)
 

  


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
}
const toggleVisibility = () => {
  setVisible(!visible)

}


const handleLike = async () => {
  try {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    
    // Päivitä blogilista App-komponentissa tai missä tahansa muualla
    updateBlogList(returnedBlog)
    
    // Näytä ilmoitus onnistuneesta tykkäyksestä
    showNotification(`You liked "${returnedBlog.title}" by ${returnedBlog.author}`, 'success')
  } catch (exception) {
    console.error('Error liking blog:', exception)
    showNotification('Error liking blog', 'error')
  }
}

const handleDelete = async () => {
  const confirmDelete = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);
  if (confirmDelete) {
    try {
      await blogService.remove(blog.id);
      showNotification(`Blog "${blog.title}" deleted`, 'success');
      updateBlogList(blog.id); // Remove the deleted blog from the list
    } catch (exception) {
      showNotification('Error deleting the blog', 'error');
    }
  }
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateBlogList: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
}


return (
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
    </div>
    {visible && (
      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLike}>Like</button>
          <p>{blog.author}</p>
          {user && blog.user && user.username === blog.user.username && (
  <       button onClick={handleDelete}>delete</button>
          )}
          
        </div>
        <div>{blog.name}</div>
      </div>
    )}
  </div>
)
}
export default Blog