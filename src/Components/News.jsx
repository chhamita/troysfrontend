import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import /public/img/logo.png from '/public/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function News(props) {
    let newsData = props.newsData

    const [selectedArticle, setSelectedArticle] = React.useState(null);

    return (
        <div className='wrapper'>
            
            <Container>
                <Row>
                    <Col>
                        <Card className='border-0 shadow'>
                            <Card.Body>
                            <Card.Title className='mb-4'><h5 className='mb-0'>News</h5></Card.Title>
                                {selectedArticle ? (
                                    <div>
                                        <div className="text-end mb-3">
                                            <button className='btn btn-primary btn-sm' onClick={() => setSelectedArticle(null)}>
                                                <FontAwesomeIcon icon={faArrowLeft} /> Back to All News
                                            </button>
                                        </div>
                                        <h3>{selectedArticle.title}</h3>
                                        <div className="news-date small mb-1 text-secondary">{selectedArticle.date_published}</div>
                                        <div className='article-image mb-4 fw-semibold' dangerouslySetInnerHTML={{ __html: selectedArticle.content_html }} />
                                        <p>{selectedArticle.content_text}</p>
                                    </div>
                                ) : (
                                    <>
                                        
                                        <ul className='list-unstyled mb-0'>
                                            {newsData.map((article) => (
                                                
                                                <li key={article.title}>
                                                <a to="/" onClick={() => setSelectedArticle(article)} className='d-flex text-decoration-none text-black py-3'>
                                                    <div className='news-img-box '>
                                                        <img src={article.image} width={200} className='rounded' />
                                                    </div>
                                                    <div className='news-content ms-3'>
                                                        <h5 className='mb-0'>{article.title}</h5>
                                                        <div className="news-date small mb-1 text-secondary">{article.date_published}</div>
                                                        <div className="">{article.content_text}</div>
                                                    </div>
                                                </a>
                                            </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default News