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
    }

    componentDidMount() {
        this.getWeather();
        setInterval(()=>{
            this.getWeather();
        },60000)
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
            return
        }

        var weather = {
            temp: (Number(result.main.temp) - 273).toFixed(0),
            description: result.weather.[0].description.replace(/^\w/, (c) => c.toUpperCase()),
            icon: result.weather.[0].icon,
            time: (result.['dt_txt']  == null) ? "now" : moment(result.['dt_txt']).format('HH:mm'),
        }

        const imageStyle = { width: (weather.time == "now") ? '100px' : '60px' }
        const tempStyle = { fontSize: (weather.time == "now") ? '80px' : '40px' }

        const baseDetail = () => {
            if (weather.time == "now")
                return <div class="description">{weather.description}</div>
            return <div class="time">{weather.time}</div>
        }

        return (
            <div class="weather_time">
                <img class="image" src={"../../static/images/" + WEATHER_ICON[weather.icon] + ".png"} style={imageStyle}/>
                <div>
                    <div class="temperature" style={tempStyle}>{weather.temp}°</div>
                    { baseDetail() }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div id="weather">
                {this.renderWeather(this.state.weatherCurrent)}
                {this.renderWeather(this.state.weatherForecast)}
            </div>
        );
    }
}

export default Weather;