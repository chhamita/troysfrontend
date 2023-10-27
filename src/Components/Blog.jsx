import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LoaderComponent from './Loader';

function BlogList(props) {
  const { setBlogs, blogs, getAllBlogsItems, loader } = props;

  //const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

  }, []);

  return (
    <div className='wrapper'>
      <Container>
        <Row>
          <Col>
          <Card className='border-0 shadow'>
          <Card.Body>
          <Card.Title className='mb-4'><h5 className='mb-0'>Blogs</h5></Card.Title>
        {selectedBlog ? (
          // Display the selected blog post
          <div>
            <div className="text-end mb-3">
                <button className='btn btn-primary btn-sm' onClick={() => setSelectedBlog(null)}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to All Blogs
                </button>
            </div>
            <h3>{selectedBlog.title}</h3>
            <img src={selectedBlog.imagePath} className='single-blog-image' />
            <p>{selectedBlog.description}</p>
         </div>

        // <div className='single-blog'>
        //     <div className="text-end mb-3">
        //       <Button
        //         className='btn btn-back btn-sm'
        //         onClick={() => setSelectedBlog(null)}
        //       >
        //         <FontAwesomeIcon icon={faArrowLeft} /> Back to All Blogs
        //       </Button>
        //     </div>
        //     <Card>
        //       <Card.Body>
        //       <Card.Title className='single-blog-title'>{selectedBlog.title}</Card.Title>
        //         <img
        //           src={selectedBlog.imagePath}
        //           alt={selectedBlog.title}
        //           className='single-blog-image'
        //         />
        //         <Card.Text className='single-blog-description'>
        //           {selectedBlog.description}
        //         </Card.Text>
                
        //       </Card.Body>
        //     </Card>
        //   </div>

        ) : (
          // Display the list of blog posts
          <>
            {
              loader ? (
                <LoaderComponent />
              ) : (
                <ul className='list-unstyled mb-0'>
                  {blogs.map((blog) => (
                    <li key={blog._id}>
                      <a to="/" onClick={() => setSelectedBlog(blog)} className='d-flex text-decoration-none text-black py-3'>
                        <div className='news-img-box '>
                          <img src={blog.imagePath} width={200} className='rounded' />
                        </div>
                        <div className='news-content ms-3'>
                          <h5 className='mb-0'>{blog.title}</h5>
    
                          <div className='truncate-description'>
                            {blog.description ? (
                              blog.description.length > 100 ? (
                                <>
                                  {blog.description.slice(0, 100)}{' '}
                                  <span
                                    className='read-more'
                                    onClick={() => setSelectedBlog(blog)}
                                  >
                                    ...Read More
                                  </span>
                                </>
                              ) : (
                                blog.description
                              )
                            ) : (
                              // Handle cases where blog.description is undefined or falsy
                              "No description available"
                            )}
                          </div>

                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )
            }
            {error && <p className='text-danger'>{error}</p>}
          </>
        )}
         </Card.Body>
        </Card>
        </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BlogList;
