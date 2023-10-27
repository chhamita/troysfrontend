import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import axios from 'axios';

function AddBlog(props) {
  const { setBlogs, blogs, getAllBlogsItems, loader } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  const handleBlog = () => {
    if (!title || !description || !image) {
      setError('Please fill in all fields and select an image.');
      return;
    }
  
    const data = {
      title: title,
      description: description,
      imagePath: image,
    };
  
    axios
      .post('http://localhost:4500/api/item', data)
      .then((response) => {
        getAllBlogsItems()
        setSuccessMessage('Blog added successfully');
        setErrorMessage('');
        // Reset form fields
        setTitle('');
        setDescription('');
        setImage(null);
        setError(null);
  
        // Set the success message to disappear after 3000 milliseconds (3 seconds)
        setIsSuccessMessageVisible(true);
        setTimeout(() => {
          setIsSuccessMessageVisible(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error posting blog:', error);
        setErrorMessage('Error adding blog');
        setSuccessMessage('');
      });
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a FileReader instance
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImage(base64Image); // Set the base64 image data
      };
  
      reader.readAsDataURL(file); // Read the image file as a Data URL
    }
  };

  return (
    <div className='wrapper'>
      <Container>

        <div className='row'>

        {isSuccessMessageVisible && (
          <Alert variant="success">{successMessage}</Alert>
        )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <div className='col-md-6 mx-auto'>
            <div className='border-0 card shadow-lg'>
              <div className="bg-secondary-subtle card-header">
                <h4 className='mb-0 text-center text-white'>ADD BLOG</h4>
              </div>
              <div className='card-body'>
                <form encType="multipart/form-data">
                  <div className='form-group mb-3'>
                    <label className='fw-medium'>Title:</label>
                    <input
                      className='form-control'
                      type="text"
                      placeholder="Enter the title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className='form-group mb-3'>
                    <label className='fw-medium'>Description:</label>
                    <textarea
                      className='form-control'
                      rows="5" // You can adjust the number of rows as needed
                      placeholder="Enter the description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className='form-group mb-3'>
                    <label className='fw-medium'>Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <div className="text-center">
                    <button
                      type="button"
                      className='btn btn-primary px-4 login-btn'
                      onClick={handleBlog}
                    >
                      ADD BLOG
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddBlog;
