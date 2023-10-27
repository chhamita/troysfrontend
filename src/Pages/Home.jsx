import * as React from 'react'
import '../assets/scss/style.scss'
import { AxiosInstance } from '../Utils'
import axios from 'axios';


function Home() {
    const [currentWeather, setCurrentWeather] = React.useState(null);
    const [tenDaysWeather, setTenDaysWeather] = React.useState(null);
    const [hourlyData, setHourlyData] = React.useState(null);
    const [region, setRegion] = React.useState();


    React.useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const getCountryFromIP = async () => {
            try {
                const response = await axios.get('https://ipinfo.io/json?token=c68192fd24aa17');
                setRegion(response.data.region)
            } catch (error) {
                console.error('Error fetching geolocation data:', error);
                return null;
            }
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


                } catch (error) {
                    console.error('Error fetching weather data:', error);
                } finally {
                    // setLoading(false);
                }
            };
            fetchHourlyData()

        }
    }, [region]);


    console.log('Current Weather', currentWeather);
    console.log('Ten days Weather', tenDaysWeather);
    console.log('Hourly Weather', hourlyData);



    return (
        <>



        </>
    )
}

export default Home





