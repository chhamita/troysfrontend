import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: 'https://api.weatherapi.com/v1', // Use HTTPS for secure connections
  headers: {
    "Content-Type": "application/json",
    //"key": "87a7f6cf7ac6474b8fb134942231309", // Rename "key" to "apikey"
    "key":"9ec95a8b37344ad8944113501231010",
  },
  timeout: 10000, // Define timeout here, outside of the headers object
});

export default AxiosInstance;

