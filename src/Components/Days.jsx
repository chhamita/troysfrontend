import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudRain } from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

function Days(props) {
    
    let weatherData = props.weatherData;
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
        return <p>No weather data available.</p>;
    }
    
    return (

        <>

            <div className='wrapper'>
                <Container >
                    <Row>
                        <Col>
                            <Card className='border-0 shadow rounded'>
                                <Card.Body className='p-0'>
                                    <div className='p-3'><h3 className='pb-3 mb-0'>7-Days Weather  <span className='fs-6 fw-normal'> </span></h3>
                                        {/* <p className='text-secondary'>As of 16:19 IST</p> */}
                                    </div>
                                    <Accordion defaultActiveKey="0" className='' >

                                        {weatherData.forecast.forecastday.map((day, index) => (
                                            <Accordion.Item eventKey={index.toString()} key={day.date_epoch} className='border-0 border-top rounded-0'>
                                                <Accordion.Header>
                                                    <ListGroup horizontal className="w-100 justify-content-between align-items-center" >
                                                        <ListGroup.Item className=''>{day.date}</ListGroup.Item>
                                                        <ListGroup.Item className=''>{`${day.day.maxtemp_f}`}<sup>°F</sup>/{`${day.day.mintemp_f}`}°F<sup>°F</sup></ListGroup.Item>
                                                        <ListGroup.Item className='flex-fill'>
                                                            {day.day.condition && day.day.condition.icon ? (
                                                                <div>
                                                                    {day.day.condition.text}{' '}
                                                                    <img src={day.day.condition.icon} alt="Weather Icon" className="ms-2" />
                                                                </div>
                                                            ) : (
                                                                'N/A'
                                                            )}
                                                        </ListGroup.Item>
                                                        <ListGroup.Item className=''><FontAwesomeIcon className='text-primary' icon={faCloudRain} />{`${day.day.totalprecip_in}%`}</ListGroup.Item>
                                                        <ListGroup.Item className='float-end'><FontAwesomeIcon className='text-primary' icon={faWind} />{` ${day.day.maxwind_mph} mph`}</ListGroup.Item>
                                                    </ListGroup>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Card className="text-center">
                                                        <Card.Body>
                                                            <Card.Text>
                                                                <Row>
                                                                    <Col>
                                                                        <ListGroup className="">
                                                                            <ListGroup.Item className='d-flex justify-content-between'>
                                                                                <span className='d-flex'>
                                                                                    <FontAwesomeIcon icon={faUpload} style={{ color: "#437ddf" }} className='pe-2 mt-2' /> Sunrise<br />{day.astro.sunrise}
                                                                                </span>
                                                                                <span className='d-flex'>
                                                                                    <FontAwesomeIcon icon={faDownload} style={{ color: "#4c85e6" }} className='pe-2 mt-2' /> Sunset<br />{day.astro.sunset}
                                                                                </span>
                                                                            </ListGroup.Item>
                                                                            <ListGroup.Item className='border-top d-flex justify-content-between'>
                                                                                <span className='d-flex'>
                                                                                    <FontAwesomeIcon icon={faDroplet} style={{ color: "#437ddf" }} className='pe-2 mt-2' /> Humidity<br />{day.day.avghumidity}
                                                                                </span>
                                                                                <span className='d-flex'>
                                                                                    <FontAwesomeIcon icon={faSun} style={{ color: "#437ddf" }} className='pe-2 mt-2' /> UV Index<br />{day.day.uv}
                                                                                </span>
                                                                            </ListGroup.Item>
                                                                        </ListGroup>
                                                                    </Col>
                                                                    <Col>
                                                                        <ListGroup className="">
                                                                            <ListGroup.Item className='d-flex justify-content-between'>
                                                                                <span className='d-flex'>
                                                                                    <FontAwesomeIcon icon={faUpload} style={{ color: "#437ddf" }} className='pe-2 mt-2' /> Moonrise<br />{day.astro.moonrise}
                                                                                </span>
                                                                                <span className='d-flex'>
                                                                                    <FontAwesomeIcon icon={faDownload} style={{ color: "#4c85e6" }} className='pe-2 mt-2' /> Moonset<br />{day.astro.moonset}
                                                                                </span>
                                                                            </ListGroup.Item>
                                                                            <ListGroup.Item className='border-top d-flex justify-content-between'>
                                                                                <span className='d-flex'>
                                                                                    <FontAwesomeIcon icon={faDroplet} style={{ color: "#437ddf" }} className='pe-2 mt-2' /> Humidity<br />{day.day.avghumidity}
                                                                                </span>
                                                                                <span className='d-flex'>
                                                                                    <FontAwesomeIcon icon={faSun} style={{ color: "#437ddf" }} className='pe-2 mt-2' /> UV Index<br />{day.day.uv}
                                                                                </span>
                                                                            </ListGroup.Item>
                                                                        </ListGroup>
                                                                    </Col>
                                                                </Row>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Accordion.Body>
                                            </Accordion.Item>


                                        ))}


                                    </Accordion>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container >
            </div>
        </>
    )
}

export default Days