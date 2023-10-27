import React, { useState, useEffect } from 'react';
import { Container, Alert, Card, Button, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoaderComponent from './Loader';

function BlogList({ setKey, listProps }) {
  const { setBlogs, blogs, getAllBlogsItems, setLoader, loader } = listProps;
  const [data, setdata] = useState('')
  //const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editBlogData, setEditBlogData] = useState({
    title: '',
    description: '',
    imagePath: '',
  });

  const [editSuccessMessage, setEditSuccessMessage] = useState('');
  const [isEditSuccess, setIsEditSuccess] = useState(false);


  const [imagePath, setImage] = useState(null);
  const [messageDisplayTimeout, setMessageDisplayTimeout] = useState(null);

  const fetchBlogs = () => {
    axios
      .get('http://localhost:4500/api/item')
      .then((response) => {
        setBlogs(response.data);
        setdata('somethig')
      })
      .catch((error) => {
        setError('Failed to fetch blogs');

      });
  };

  useEffect(() => {
    // Fetch the list of blogs when the component mounts
    //fetchBlogs();
  }, []);

  const handleEditBlog = () => {
    if (messageDisplayTimeout) {
      clearTimeout(messageDisplayTimeout); // Clear any existing timeout
    }
  
    // Check if required fields are empty
    if (!editBlogData.title || !editBlogData.description) {
      // Show the error message inside the edit modal
      setEditSuccessMessage('Title and description are required.');
      setIsEditSuccess(false);   
  
      // Set a timeout to clear the error message inside the modal after 3 seconds
      const timeout = setTimeout(() => {
        setEditSuccessMessage('');
        setIsEditSuccess(false);
      }, 3000);
  
      setMessageDisplayTimeout(timeout);
    } else {
      axios
        .put(`http://localhost:4500/api/item/${selectedBlog._id}`, editBlogData)
        .then(async (response) => {
          setLoader(true);
  
          // Handle the successful update
          console.log('Blog updated successfully', editBlogData);
          setShowEditModal(false);
  
          // Clear the error message if it was displayed inside the modal
          setEditSuccessMessage('');
          setIsEditSuccess(false);
  
          // Show the success message outside the modal
          setEditSuccessMessage('Blog updated successfully');
          setIsEditSuccess(true);
  
          // Set a timeout to clear the success message after 3 seconds
          const timeout = setTimeout(() => {
            setEditSuccessMessage('');
            setIsEditSuccess(false);
          }, 3000);
  
          setMessageDisplayTimeout(timeout);
  
          await getAllBlogsItems();
        })
        .catch((error) => {
          // Handle errors
          console.error('Error updating blog:', error);
          setEditSuccessMessage('Error updating blog');
          setIsEditSuccess(true);
  
          // Set a timeout to clear the error message after 3 seconds
          const timeout = setTimeout(() => {
            setEditSuccessMessage('');
            setIsEditSuccess(false);
          }, 3000);
  
          setMessageDisplayTimeout(timeout);
        });
    }
  };

  const handleEdit = (blogId) => {
    // Implement the edit functionality here /api/items/:id
    axios
      .get(`http://localhost:4500/api/item/${blogId}`)
      .then((response) => {
        const blogData = response.data;
        setEditBlogData({
          title: blogData.title,
          description: blogData.description,
          imagePath: blogData.imagePath,
        });
        setSelectedBlog(blogData); // Set the selected blog
        setShowEditModal(true);
      })
      .catch((error) => {
        console.error('Failed to retrieve blog data for editing:', error);
      });
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false); // Close the delete confirmation modal

    // Implement the delete functionality here
    axios
      .delete(`http://localhost:4500/api/item/${selectedBlog}`)
      .then((response) => {
        // Handle the successful delete
        setDeleteSuccessMessage('Blog deleted successfully');
        setIsDeleteSuccess(true);

        // Automatically hide the success message after 3000 milliseconds (3 seconds)
        setTimeout(() => {
          setIsDeleteSuccess(false);
        }, 3000);

        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== selectedBlog)
        );
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting blog:', error);
      });
  };


  const handleDelete = (blogId) => {
    setSelectedBlog(blogId); // Store the ID of the blog to be deleted
    setShowDeleteModal(true); // Open the delete confirmation modal
  };

  const handleRedirect = () => {
    setKey('addblog');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a FileReader instance
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e.target.result;
        setImage(base64Image);
        setEditBlogData({ ...editBlogData, imagePath: base64Image });
      };

      reader.readAsDataURL(file);
    }
  };

  function TruncateText({ text, maxWords = 70 }) {
    if (!text) {
      return null; // or any other fallback behavior
    }
    const words = text.split(' ');

    if (words.length <= maxWords) {
      return <Card.Text>{text}</Card.Text>
    }

    const truncatedText = words.slice(0, maxWords).join(' ');
    return <Card.Text>{truncatedText} ...</Card.Text>
  }

  return (
    <Container>
      <h2 className="my-4">List of Blogs</h2>
      <div className="text-end mb-3">
        <Button className="btn btn-primary btn-sm" onClick={handleRedirect}>
          <FontAwesomeIcon icon={faArrowLeft} /> Add Blog
        </Button>
      </div>

      {(isEditSuccess === true) && (
        <div className="alert alert-success my-3">{editSuccessMessage}</div>
      )}
      
      {isDeleteSuccess && (
        <div className="alert alert-success">{deleteSuccessMessage}</div>
      )}
      {
        loader ? (
          <LoaderComponent />
        ) : (
          <ul className="list-unstyled">
            {blogs.map((blog) => (
              <li key={blog._id}>
                <Card className="my-3">
                  <Card.Body>
                    <Row>
                      <Col xs={4} className='blogs-img-box'>
                        <img src={blog.imagePath} alt={blog.title} />
                      </Col>
                      <Col xs={8}>
                        <Card.Title>{blog.title}</Card.Title>
                        <TruncateText text={blog.description} />
                        <div className="d-flex">
                          <div className="mx-2">
                            <Button
                              className="btn btn-primary px-4 login-btn"
                              onClick={() => handleEdit(blog._id)}
                            >
                              Edit <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </div>
                          <div className="mx-2">
                            <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                              Delete <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        )
      }

      {
        error && <Alert variant="danger" className="my-3">
          {error}
        </Alert>
      }

      {/* Edit Blog Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {(isEditSuccess === false) && editSuccessMessage && (
            <div className="alert alert-danger my-3">{editSuccessMessage}</div>
          )}
          
          <form encType="multipart/form-data">
            <div className="form-group mb-3">
              <label className="fw-medium">Title:</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter the title"
                value={editBlogData.title}
                onChange={(e) =>
                  setEditBlogData({ ...editBlogData, title: e.target.value })
                }
              />
            </div>
            <div className="form-group mb-3">
              <label className="fw-medium">Description:</label>
              <textarea
                className='form-control'
                rows="5" // You can adjust the number of rows as needed
                placeholder="Enter the description"
                value={editBlogData.description}
                onChange={(e) =>
                  setEditBlogData({ ...editBlogData, description: e.target.value })
                }
              />
            </div>

            {editBlogData.imagePath ? (
              <div className="form-group mb-3">
                <label className="fw-medium">Current Image:</label>
                <img
                  src={editBlogData.imagePath}
                  alt={editBlogData.title}
                  className="img-thumbnail"
                />
              </div>
            ) : null}


            <div className="form-group mb-3">
              <label className="fw-medium">Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary px-4 login-btn"
                onClick={handleEditBlog}
              >
                Update Blog
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this blog?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container >
  );
}

export default BlogList;
