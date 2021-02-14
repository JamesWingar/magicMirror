import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Fade from 'react-reveal/Fade';

import WeatherAPI from "../utility/WeatherAPI";
import { WEATHER_ICON } from "../constants/";


class Weather extends React.Component{
    constructor() {
        super();
        this.state = {
            visible: true,
            weatherCurrent: [],
            weatherForecast: [],
        }
        this.getWeather();
    }

    componentDidMount() {
        setInterval(()=>{
            this.getWeather();
        },360000)
    }

    async getWeather() {
        
        const currentWeather = await WeatherAPI.getWeatherCurrent();
        const forecastWeather = await WeatherAPI.getWeatherForecast();

        const index = (moment().hour()%3 < 3) ? 0 : 1;
        this.setState({
            weatherCurrent: currentWeather.data,
            weatherForecast: forecastWeather.data.list.[index]
        })
    }

    renderWeather(result) {
        if (result.length === 0) {
            return <div> No weather data </div>
        }

        var weather = {
            temp: (Number(result.main.temp) - 273).toFixed(0),
            description: result.weather.[0].description.replace(/^\w/, (c) => c.toUpperCase()),
            icon: result.weather.[0].icon,
            time: (result.['dt_txt']  == null) ? "now" : moment(result.['dt_txt']).format('HH:mm'),
        }

        const weatherStyle = {
            flexBasis: '100%',
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            gridTemplateColumns: 'auto auto',
            gridGap: (weather.time == "now") ? '30px' : '20px',
        }

        const imageStyle = {
            width: (weather.time == "now") ? '100px' : '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }

        const tempStyle = {
            fontSize: (weather.time == "now") ? '80px' : '40px',
            display: 'block',
            fontWeight: 400,
            textAlign: 'center',
        }

        const timeStyle = {
            fontSize: '20px',
            display: 'block',
            fontWeight: 400,
            textAlign: 'center',
        }

        const descriptionStyle = {
            fontSize: '25px',
            display: 'block',
            fontWeight: 400,
            textAlign: 'center',
        }

        const baseDetail = () => {
            if (weather.time == "now")
                return <div style={descriptionStyle}>{weather.description}</div>

            return <div style={timeStyle}>{weather.time}</div>
        }

        return (
            <div style={weatherStyle}>
                <img src={"../../static/images/" + WEATHER_ICON[weather.icon] + ".png"} style={imageStyle}/>
                <div>
                    <div style={tempStyle}>{weather.temp}°</div>
                    { baseDetail() }
                </div>
            </div>
        );
    }

    render() {

        const weatherStyle = {
            flexBasis: '100%',
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            gridTemplateColumns: 'auto auto',
            gridGap: '30px',
        }

        return (
            <div id="weather">
                <div style={weatherStyle}>
                    {this.renderWeather(this.state.weatherCurrent)}
                    {this.renderWeather(this.state.weatherForecast)}
                </div>
            </div>
        );
    }
}

export default Weather;