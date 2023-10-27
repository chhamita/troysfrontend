import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Card } from 'react-bootstrap';

function Hourly(props) {
    let hourlyData = props.hourlyData;
    let astro = props.astro;

    return (
        <div className='wrapper'>
        <Container>
            <Card className='border-0 shadow rounded'>
                <Card.Body>
                    <Row className="mt-8 mb-6">
                        <Col>
                            <span className="d-flex">
                                <img src="../img/sun-png.png" width={100} alt="Sun Icon" />
                                <span className="m-3">
                                    <span className="fw-bold">Sun</span>
                                    <br />
                                    <span>
                                        <img src="../img/Sunrise.png" width={30} alt="Sunrise Icon" /> {astro?.sunrise || 'N/A'}
                                    </span>
                                    <span>
                                        <img src="../img/sunset.png" width={30} alt="Sunset Icon" /> {astro?.sunset || 'N/A'}
                                    </span>
                                </span>
                            </span>
                        </Col>
                        <Col>
                            <span className="d-flex">
                                <img src="../img/moonrise.png" width={100} alt="Moonrise Icon" />
                                <span className="p-3">
                                    <span className="fw-bold">Moon</span>
                                    <br />
                                    <span>
                                        <img src="../img/moonrise.png" width={30} alt="Moonrise Icon" /> {astro?.moonrise || 'N/A'}
                                    </span>
                                    <span>
                                        <img src="../img/moonset.png" width={30} alt="Moonset Icon" /> {astro?.moonset || 'N/A'}
                                    </span>
                                </span>
                            </span>
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        {hourlyData && hourlyData.length > 0 ? (
                            <Table responsive striped bordered>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Conditions</th>
                                        <th>Temp (°F)</th>
                                        <th>Feels Like</th>
                                        <th>Precip (mm)</th>
                                        <th>Cloud Cover</th>
                                        <th>Due Point</th>
                                        <th>Humidity (%)</th>
                                        <th>Wind (km/h)</th>
                                        <th>Pressure</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hourlyData.map((hour) => (
                                        <tr key={hour.time_epoch}>
                                            <td className="align-middle">{hour.time}</td>
                                            <td>
                                                {hour.condition && hour.condition.icon ? (
                                                    <div>
                                                        {hour.condition.text}{' '}
                                                        <img src={hour.condition.icon} alt="Weather Icon" className="custom-img-height" />
                                                    </div>
                                                ) : (
                                                    'N/A'                   
                                                )}
                                            </td>
                                            <td className="align-middle">{hour.temp_f}<sup>°F</sup></td>
                                            <td className="align-middle">{hour.feelslike_f}<sup>°F</sup></td>
                                            <td className="align-middle">{hour.precip_mm} %</td>
                                            <td className="align-middle">{hour.cloud} %</td>
                                            <td className="align-middle">{hour.dewpoint_f}<sup>°F</sup></td>
                                            <td className="align-middle">{hour.humidity} %</td>
                                            <td className="align-middle">{hour.wind_kph}</td>
                                            <td className="align-middle">{hour.pressure_in}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>No hourly data available.</p>
                        )}
                    </Row>
                    </Card.Body>
                </Card>
        </Container>
        </div>
    )
}

export default Hourly