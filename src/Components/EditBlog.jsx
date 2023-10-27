// EditBlog.js

import React, { useState, useEffect } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import axios from 'axios';

function EditBlog({ blogId }) {
  const [blog, setBlog] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the blog entry to be edited based on the blogId
    axios
      .get(`http://localhost:4500/api/item/${blogId}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        setError('Failed to fetch blog for editing');
      });
  }, [blogId]);

  // Implement your edit functionality here

  return (
    <Container>
      <h2>Edit Blog</h2>
      <p>Title: {blog.title}</p>
      <p>Description: {blog.description}</p>
      {/* Add form fields for editing here */}
      <Button variant="primary">Save Changes</Button>
      {error && <Alert variant="danger">{error}</Alert>}
    </Container>
  );
}

export default EditBlog;
