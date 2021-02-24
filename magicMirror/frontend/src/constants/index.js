//import ConfigData from 'ConfigData';
var Config = require('Config')

// Backend API
export const API_BASE_URL = "http://" + Config.host.ip + ":8000/api/";

// Weather API
export const WEATHER_API = 'https://api.openweathermap.org/data/2.5/';
export const WEATHER_API_CITY = Config.weather.city;
export const WEATHER_API_KEY = Config.weather.key;
export const WEATHER_ICON = {
    '01d': 'Sun',
    '01n': 'Moon',
    '02d': 'Cloud_Sunny',
    '02n': 'Cloud_Moon',
    '03d': 'cloud',
    '03n': 'Cloud',
    '04d': 'Cloud',
    '04n': 'Cloud',
    '09d': 'Rain',
    '09n': 'Rain',
    '10d': 'Rain',
    '10n': 'Rain',
    '11d': 'Storm',
    '11n': 'Storm',
    '13d': 'Snow',
    '13n': 'Snow',
    '50d': 'Haze',
    '50n': 'Haze'
};

// Notes API
// TODO
