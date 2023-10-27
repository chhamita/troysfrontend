import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../assets/scss/style.scss'
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { faPooStorm } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card';

function Today(props) {
    let currentWeather = props.currentWeather
    let weatherData = props.weatherData;
  
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
        return <p>No weather data available.</p>;
    }

    function formatTimestampToDate(timestamp) {
        const date = new Date(timestamp * 1000);
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = weekdays[date.getUTCDay()];
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        return `${dayOfWeek} ${day}/${month}`;
    }
    
    const timestamp1 = weatherData.forecast.forecastday[0].date_epoch;
    const formattedDate1 = formatTimestampToDate(timestamp1);
    
    const timestamp2 = weatherData.forecast.forecastday[1].date_epoch;
    const formattedDate2 = formatTimestampToDate(timestamp2);

    if (!currentWeather) {
        return null; // or render a loading message or fallback content
    }
    return (
        <div className='wrapper'>
            <Container>
                <Card className='bg-light' >
                    <div  className='cloud_bg'>
                        <Card.Header className="fw-normal fs-4 text-white border-bottom">
                            {currentWeather.location && currentWeather.location.localtime}
                        </Card.Header>
                        <Card.Body className='text-white'>
                            <Card.Title>
                                <span>
                                    {currentWeather.current.condition && (
                                        <img src={currentWeather.current.condition.icon} width={100} alt="Weather Icon" />
                                    )}
                                    <span className="fw-bolder fs-1 ps-3">
                                        {currentWeather.current.feelslike_f}<sup>°F</sup>
                                    </span>
                                </span>
                                <span className='float-end'>
                                    {currentWeather.current &&
                                        <h5 className="fw-bold fs-4">
                                            {currentWeather.current.temp_f}<sup>°F</sup>
                                        </h5>
                                    }
                                </span>
                                {currentWeather.current.condition && (
                                    <h5>{currentWeather.current.condition.text}</h5>
                                )}
                            </Card.Title>
                            <Card.Text></Card.Text>
                        </Card.Body>
                    </div>
                </Card>
                <Row className='my-4'>
                    <Col className='pe-0'>
                        <div className='bg-light p-3 h-100'>
                            <span className='d-flex'>
                                <img src={weatherData.forecast.forecastday[0].day.condition.icon} className='w-25'></img>
                                <span className='p-2'>
                                    <span className='fw-bold'>TODAY</span><br></br>
                                    <span className='fw-bold'>{formattedDate1}</span><br></br>
                                    <p className='fw-normal'>HIGH {weatherData.forecast.forecastday[0].day.maxtemp_f}<sup>°F</sup></p>
                                </span>
                            </span>
                            <p>{weatherData.forecast.forecastday[0].day.condition.text}. High {weatherData.forecast.forecastday[0].day.maxtemp_f}<sup>°F</sup></p>
                        </div>
                    </Col>
                    <Col className='px-0'>
                        <div className='bg-color-gray p-3 h-100'>
                            <span className='d-flex'>
                                <img src='../img/moon.svg' className='w-25'></img>
                                <span className='p-2'>
                                    <span className='fw-bold'>TONIGHT</span><br></br>
                                    <span className='fw-bold'>{formattedDate1}</span><br></br>
                                    <span className='fw-normal'>Low {weatherData.forecast.forecastday[0].day.mintemp_f}<sup>°F</sup></span> 

                                </span>
                            </span>
                            <p>{weatherData.forecast.forecastday[0].day.mintemp_f}<sup>°F</sup></p>
                        </div>
                    </Col>
                    <Col className='ps-0'>
                        <div className='bg-light p-3 h-100'>
                            <span className='d-flex'>
                                <img src={weatherData.forecast.forecastday[1].day.condition.icon} className='w-25'></img>
                                <span className='p-2'>
                                    <span className='fw-bold'>TOMORROW</span><br></br>
                                    <span className='fw-bold'>{formattedDate2}</span><br></br>
                                    <span className='fw-normal'>HIGH {weatherData.forecast.forecastday[1].day.maxtemp_f}<sup>°F</sup></span>
                                </span>
                            </span>
                            <p>{weatherData.forecast.forecastday[1].day.condition.text} {weatherData.forecast.forecastday[1].day.maxtemp_f}<sup>°F</sup></p>
                        </div>
                    </Col>
                </Row>
                                    
                <Row className='mb-4'>
                    <Col className='' >
                        <div className='bg-light' >
                            <h4 className='mb-0 px-3 py-2 cloud_bg text-white'>Weather Today</h4>
                            <div className='p-4'>
                                <Row>
                                    <Col className='cloud_weather'>
                                        <h6 className=''>Feels Like </h6>
                                        <h4 className='fs-2'>{currentWeather.current.feelslike_f}<sup>°F</sup></h4>
                                    </Col>

                                </Row>

                                <Row>
                                    <Col>
                                        <div className=''>
                                            <ListGroup className=""  >
                                                <ListGroup.Item className='bg-light'>
                                                    <span className='float-start'><FontAwesomeIcon icon={faTemperatureHigh} /> Temprature</span>
                                                    <span className='float-end'> {currentWeather.current.temp_f}<sup>°F</sup></span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className='border-top bg-light'>
                                                    <span className='float-start'><FontAwesomeIcon icon={faDroplet} /> Humidity</span>
                                                    <span className='float-end '>   {currentWeather.current.humidity}%</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className='border-top bg-light'>
                                                    <span className='float-start p-1'><FontAwesomeIcon icon={faPooStorm} /> Pressure
                                                    </span>
                                                    <span className='float-end'>   {currentWeather.current.pressure_mb} mb</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className='border-top bg-light'>
                                                    <span className='float-start p-1'><FontAwesomeIcon icon={faEye} /> Visibility
                                                    </span>
                                                    <span className='float-end'>
                                                        {currentWeather.current.vis_km} km
                                                    </span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className=''>
                                            <ListGroup className="">
                                                <ListGroup.Item className='bg-light rounded-0'>
                                                    <span className='float-start'><FontAwesomeIcon icon={faWind} /> Wind</span>
                                                    <span className='float-end'> {currentWeather.current.wind_kph}  km/h</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className='border-top bg-light'>
                                                    <span className='float-start'><FontAwesomeIcon icon={faDroplet} /> Preciption</span>
                                                    <span className='float-end '> {currentWeather.current.precip_in} % </span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className='border-top bg-light'>
                                                    <span className='float-start p-1'><FontAwesomeIcon icon={faPooStorm} /> UV Index
                                                    </span>
                                                    <span className='float-end'> {currentWeather.current.uv} </span>
                                                </ListGroup.Item>
                                                <ListGroup.Item className='border-top bg-light'>
                                                    <span className='float-start p-1'><FontAwesomeIcon icon={faEye} /> Gust
                                                    </span>
                                                    <span className='float-end'>
                                                        {currentWeather.current.gust_kph} km/h</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        </div>
    )
}

export default Today