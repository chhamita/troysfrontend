import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ListGroup } from 'react-bootstrap';
import { AxiosInstance } from '../Utils'
import axios from 'axios';
import Hourly from './Hourly';
import Days from './Days';
import Today from './Today';
import News from './News';
import History from './History';
import Radar from './Radar';
import LoaderComponent from './Loader';
import debounce from 'lodash/debounce';
import Login from './Login';
import Blog from './Blog';
import BlogList from './BlogList';
import AddBlog from './AddBlog';

function Header({ isLoggedIn, setIsLoggedIn }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentWeather, setCurrentWeather] = React.useState(null);
    const [tenDaysWeather, setTenDaysWeather] = React.useState(null);
    const [hourlyData, setHourlyData] = React.useState(null);
    const [region, setRegion] = React.useState();
    const [astro, setAstro] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState();
    const [location, setLocation] = React.useState();
    const [newsData, setNewsData] = React.useState([]);
    const [HistoryData, setHistoryData] = React.useState([]);

    const [searchResults, setSearchResults] = useState([]);
    const [key, setKey] = useState('today');

    const [blogs, setBlogs] = useState([]);
    const [loader, setLoader] = useState(true);

    React.useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const getCountryFromIP = async () => {
            try {
                const response = await axios.get('https://ipinfo.io/json?token=c68192fd24aa17');
                
                setLocation(response.data.loc)

            } catch (error) {
                console.error('Error fetching geolocation data:', error);
                return null;
            }
            await getAllBlogsItems()
        };
        getCountryFromIP()
        if (region) {


            const fetchWeatherCurrent = async () => {
                try {
                    const response = await AxiosInstance.get("/current.json", {
                        params: {
                            q: region,
                        },
                    });
                    setCurrentWeather(response.data);
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            }
            fetchWeatherCurrent();

            const fetchTenDaysWeather = async () => {
                try {
                    const response = await AxiosInstance.get('/forecast.json', {
                        params: {
                            q: region,
                            days: '10',
                            aqi: 'yes',
                            alerts: 'yes',
                        },
                    });

                    setTenDaysWeather(response.data);

                } catch (error) {
                    console.error('Error fetching weather data:', error);
                } finally {
                    //setLoading(false);
                }
            };
            fetchTenDaysWeather();

            const fetchHourlyData = async () => {
                try {
                    const response = await AxiosInstance.get('/forecast.json', {
                        params: {
                            q: region,
                            dt: formattedDate,
                            days: '1',
                            aqi: 'yes',
                            alerts: 'yes',
                        },
                    });
                    const extractedHourlyData = response.data?.forecast?.forecastday?.[0]?.hour || [];
                    setHourlyData(extractedHourlyData);
                    const astroData = response.data?.forecast?.forecastday?.[0]?.astro || null;
                    setAstro(astroData);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                } finally {
                    // setLoading(false);
                }
            };
            fetchHourlyData()

            const fetchNewsData = () => {
                // Fetch news data
                const apiKey = '7a5ef014b6e5fc32bcf3a759280c7e08';
                const country = region; // Replace with the desired country code
                const keywords = 'weather OR climate';
                const encodedKeywords = encodeURIComponent(keywords);

                // Include the "content" parameter in the API request
                axios
                    .get(`https://rss.app/feeds/v1.1/tCTQCmRRRkvlqXWX.json`)
                    .then((response) => {
                        const articles = response.data.items;
                        setNewsData(articles);
                    })
                    .catch((error) => {
                        console.error('Error fetching news:', error);
                    });
            };

            fetchNewsData();

            const fetchHistoryData = async (date) => {
                // const API_KEY = '87a7f6cf7ac6474b8fb134942231309';
                try {
                    const formattedDate = date.toISOString().split('T')[0];
                    const response = await AxiosInstance.get('/history.json', {
                        params: {
                            q: region,
                            dt: formattedDate,
                        },
                    });

                    return response.data;

                } catch (error) {
                    console.error('Error fetching historical weather data:', error);
                    return null;
                }
            };

            // Get the current date
            const currentDate = new Date();

            // Generate an array of the last 7 days' dates (excluding today)
            const last7Days = [];
            for (let i = 1; i <= 7; i++) {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - i);
                last7Days.push(date);
            }

            // Fetch weather data for each date in parallel
            Promise.all(last7Days.map(fetchHistoryData))
                .then((data) => {
                    // Filter out null responses (failed requests)
                    const validData = data.filter((item) => item !== null);
                    setHistoryData(validData);
                })
                .catch((error) => {
                    console.error('Error fetching historical weather data:', error);
                });

        }
    }, [region]);

    const handleSearchDebounced = debounce((keySearch) => {
        handleSearchClick(keySearch)
    }, 400); 

    // Event handler for handling user input in the search field
    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.length > 2) {
            handleSearchDebounced(value)
        }
        if (value.trim() === '') {
            setSearchResults([]);
            setRegion(location)
        }
    };

    const getAllBlogsItems = async () => {
        axios
            .get('http://localhost:4500/api/item')
            .then((response) => {
                setBlogs(response.data);
                setLoader(false)
            })
            .catch((error) => {
                // setError('Failed to fetch blogs');
            });
    }

    React.useEffect(() => {
        if (searchValue) {
            setRegion(searchValue);
        } else {
            setRegion(location)
        }
    }, [searchValue, location])

    // Event handler for initiating the search
    const handleSearchClick = async (search) => {

        if (!search) {
            console.error('Search query is empty.');
            return;
        }

        try {
            const response = await axios.get(
                `http://api.weatherapi.com/v1/search.json?key=9ec95a8b37344ad8944113501231010&q=${search}`
            );

            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    }

    // Event handler for selecting a region from the search results
    const handleSelectRegion = (selectedCity, selectedRegion) => {
        setSearchQuery(selectedCity + ',' + selectedRegion); // Set the searchQuery with the selected region
        setRegion(selectedCity + ',' + selectedRegion);
        setSearchResults([]);
    }

    const handleLogoutClick = (key) => {
        setKey(key)
        if (key === 'logout') {
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false)
        }
    }

    React.useEffect(() => {
        if (isLoggedIn) {
            setKey('blog')
        } else {
            setKey('today')
        }
    }, [isLoggedIn])

    const blogProps = {
        setBlogs,
        blogs,
        getAllBlogsItems,
        loader,
        setLoader
    }


    return (
        <>
            <div className='bg-gradient-header text-white'>
                <Container className=''>
                    <Row>
                        <Col className='col-md-4'>
                            <div className="">
                                <img className='img-fluid' src="img/FullLogo_NoBuffer.jpg" />
                                {/* <h3 className='p-4'>Troys Wild Weather</h3> */}
                            </div>
                        </Col>
                        <Col className='bg-gradient-header text-white col-md-3 ms-auto'>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search Location"
                                    className="mr-sm-2 mt-4"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />

                            </Col>
                            <Col className="search-col">
                                {searchResults.length > 0 && (
                                    <ListGroup className='position-absolute w-100' style={{ border:'1px solid #ccc' }}>
                                        {searchResults.map((result) => (
                                            <ListGroup.Item
                                                key={result.region}
                                                onClick={() => handleSelectRegion(result.name, result.region)}
                                                action // This adds a hover effect
                                                className="d-flex justify-content-between align-items-center"
                                            >
                                                <span>
                                                    <strong>{result.name}</strong> - {result.region}
                                                </span>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </Col>
                            {/* searchable input field react (should work on keyup) */}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Tabs
                activeKey={key}
                defaultActiveKey="today"
                id="justify-tab-example"
                justify
                onSelect={(k) => handleLogoutClick(k)}
            >
                <Tab eventKey="today" title="Today" >
                    {
                        tenDaysWeather && currentWeather ? (
                            <Today currentWeather={currentWeather} weatherData={tenDaysWeather} />
                        ) : (
                            <LoaderComponent />
                        )
                    }
                </Tab>
                <Tab eventKey="Hourly" title="Hourly">
                    {
                        hourlyData && astro ? (
                            <Hourly hourlyData={hourlyData} astro={astro} />
                        ) : (
                            <LoaderComponent />
                        )
                    }
                </Tab>
                <Tab eventKey="days" title="7 Days">
                    {
                        tenDaysWeather ? (
                            <Days weatherData={tenDaysWeather} />
                        ) : (
                            <LoaderComponent />
                        )
                    }
                </Tab>
                <Tab eventKey="history" title="History" >
                    {
                        HistoryData ? (
                            <History HistoryData={HistoryData} />
                        ) : (
                            <LoaderComponent />
                        )
                    }
                </Tab>
                <Tab eventKey="news" title="News" >
                    {
                        newsData ? (
                            <News newsData={newsData} />
                        ) : (
                            <LoaderComponent />
                        )
                    }
                </Tab>
                <Tab eventKey="radar" title="Radar" >
                    {
                        currentWeather ? (
                            <Radar currentWeather={currentWeather} />
                        ) : (
                            <LoaderComponent />
                        )
                    }
                </Tab>
                {/* <Tab eventKey="blog" title="Blog"><Blog {...blogProps} /> </Tab> */}
                
                <Tab eventKey="blog" title="Blog">
                    {blogs.length > 0 ? (
                        <Blog {...blogProps} />
                    ) : (
                        <LoaderComponent />
                    )}
                </Tab>

                {
                    !isLoggedIn && (
                        <Tab eventKey="login" title="Login" >
                            <Login setIsLoggedIn={setIsLoggedIn} />
                        </Tab>
                    )
                }
                {/* {isLoggedIn && (<Tab eventKey="bloglist" title="BlogList" ><BlogList setKey={setKey} listProps={blogProps} /> </Tab>)} */}
                {isLoggedIn && (
                    <Tab eventKey="bloglist" title="BlogList">
                        {blogs.length > 0 ? (
                        <BlogList setKey={setKey} listProps={blogProps} />
                        ) : (
                        // Render something else or a message when the 'blogs' array is empty
                        <LoaderComponent />
                        )}
                    </Tab>
                    )}
                {isLoggedIn && (<Tab eventKey="addblog" title="AddBlog" ><AddBlog setKey={setKey} {...blogProps} /> </Tab>)}
                {isLoggedIn && (<Tab eventKey="logout" title="Logout" />)}
            </Tabs>
        </>
    )
}

export default Header