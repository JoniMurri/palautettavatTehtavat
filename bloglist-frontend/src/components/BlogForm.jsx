import React, {useState, useRef} from "react"
import Togglable from "./Togglable"
import PropTypes from 'prop-types'
   


    const BlogForm = ({ createBlog }) => {
      const [title, setTitle] = useState("");
      const [author, setAuthor] = useState("");
      const [url, setUrl] = useState("");
      const blogFormRef = useRef();
    
      const handleSubmit = (event) => {
        event.preventDefault();
        createBlog({
          title,
          author,
          url,
        });
        setTitle("");
        setAuthor("");
        setUrl("");
        blogFormRef.current.toggleVisibility(); // Hide the form after submission
      }
    
      const handleCancel = () => {
        blogFormRef.current.toggleVisibility(); // Hide the form when canceled
      }
    

      return (
        <Togglable ref={blogFormRef} buttonLabel="create new blog">
          <h2>Create a new blog</h2>
          <form onSubmit={handleSubmit}>
            <div>
              title:
              <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">create</button>
            <button type="button" onClick={handleCancel}>
              cancel
            </button>
          </form>
        </Togglable>
      )
    }
    BlogForm.propTypes = {
      createBlog: PropTypes.func.isRequired,
    }
    export default BlogForm