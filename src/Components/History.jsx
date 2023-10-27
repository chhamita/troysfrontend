
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

export default function History(props) {

    let HistoryData = props.HistoryData;
    
    return (
        <div className='wrapper'>
            <Container>
                <Row>
                    <Col>
                        <Card className='border-0 shadow rounded'>
                            <Card.Body className='p-0'>
                                <div className='p-3'>
                                    <h3 className='pb-3 mb-0'>Historical Weather</h3>
                                </div>
                                <Accordion defaultActiveKey="0" className=''>
                                    {HistoryData.map((data, index) => (
                                        <Accordion.Item eventKey={`historical-${index}`} key={index} className='border-0 border-top rounded-0'>
                                            <Accordion.Header>


                                                <ListGroup horizontal className="w-100 justify-content-between align-items-center">
                                                    <ListGroup.Item className=''>{data.forecast.forecastday[0].date}
                                                    </ListGroup.Item>

                                                    <ListGroup.Item className=''>{data.forecast.forecastday[0].day.maxtemp_f}<sup>°F</sup>/{data.forecast.forecastday[0].day.mintemp_f}<sup>°F</sup>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='flex-fill'>{data.forecast.forecastday[0].day.condition.text}
                                                        <img src={data.forecast.forecastday[0].day.condition.icon} className="ms-2" width={30}></img>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item className=''><FontAwesomeIcon className='text-primary' icon={faCloudRain} /> {data.forecast.forecastday[0].day.totalprecip_mm}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item className='float-end'><FontAwesomeIcon className='text-primary' icon={faWind} />  NNE {data.forecast.forecastday[0].day.maxwind_kph} km/h
                                                    </ListGroup.Item>
                                                </ListGroup>

                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Card className="text-center">
                                                    <Card.Body>
                                                        <Card.Text>
                                                            <Row>
                                                                <Col>
                                                                    <ListGroup className=""  >
                                                                        <ListGroup.Item className='d-flex justify-content-between'>
                                                                            <span className='d-flex'>
                                                                                <FontAwesomeIcon icon={faUpload} style={{ color: "#437ddf", }} className='pe-2 mt-2' /> Sunrise
                                                                                <br></br>
                                                                                {data.forecast.forecastday[0].astro.sunrise}
                                                                            </span>
                                                                            <span className='d-flex'>
                                                                                <FontAwesomeIcon icon={faDownload} style={{ color: "#4c85e6", }} className='pe-2 mt-2' /> Sunset
                                                                                <br></br>
                                                                                {data.forecast.forecastday[0].astro.sunset}
                                                                            </span>
                                                                        </ListGroup.Item>
                                                                        <ListGroup.Item className='border-top d-flex justify-content-between'>
                                                                            <span className='d-flex'>
                                                                                <FontAwesomeIcon icon={faDroplet} style={{ color: "#437ddf", }} className='pe-2 mt-2' /> Humidity
                                                                                <br></br>

                                                                                {data.forecast.forecastday[0].day.avghumidity}

                                                                            </span>
                                                                            <span className='d-flex'>
                                                                                <FontAwesomeIcon icon={faSun} style={{ color: "#437ddf", }} className='pe-2 mt-2' /> UV Index
                                                                                <br></br>
                                                                                {data.forecast.forecastday[0].day.uv}
                                                                            </span>
                                                                        </ListGroup.Item>
                                                                    </ListGroup>
                                                                </Col>
                                                                <Col>
                                                                    <ListGroup className=""  >
                                                                        <ListGroup.Item className='d-flex justify-content-between'>
                                                                            <span className='d-flex'>
                                                                                <FontAwesomeIcon icon={faUpload} style={{ color: "#437ddf", }} className='pe-2 mt-2' /> Moonrise
                                                                                <br></br>
                                                                                {data.forecast.forecastday[0].astro.moonrise}
                                                                            </span>
                                                                            <span className='d-flex'>
                                                                                <FontAwesomeIcon icon={faDownload} style={{ color: "#4c85e6", }} className='pe-2 mt-2' /> Moonset
                                                                                <br></br>
                                                                                {data.forecast.forecastday[0].astro.moonset}
                                                                            </span>
                                                                        </ListGroup.Item>
                                                                        <ListGroup.Item className='border-top d-flex justify-content-between'>
                                                                            <span className='d-flex'>
                                                                                <FontAwesomeIcon icon={faDroplet} style={{ color: "#437ddf", }} className='pe-2 mt-2' /> Moon Phase
                                                                                <br></br>
                                                                                {data.forecast.forecastday[0].astro.moon_phase}
                                                                            </span>
                                                                            <span className='d-flex'>
                                                                                <FontAwesomeIcon icon={faSun} style={{ color: "#437ddf", }} className='pe-2 mt-2' /> Moon Illutminaion
                                                                                <br></br>
                                                                                {data.forecast.forecastday[0].astro.moon_illumination}
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
            </Container>
        </div>






    )
}
