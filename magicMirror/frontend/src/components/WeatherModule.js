import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import WeatherAPI from "../utility/WeatherAPI";
import { WEATHER_ICON } from "../constants/";

class Weather extends React.Component{
    constructor() {
        super();
        this.state = {
            visible: true,
            weatherCurrent: [],
            weatherForecast: [],
        };
        WeatherAPI.getWeatherCurrent().then((response) => {
                this.setState({ weatherCurrent: response.data })
            })
        WeatherAPI.getWeatherForecast().then((response) => {
                this.setState({ weatherForecast: response.data.list.[1] })
            })
    }

    componentDidMount() {
        setInterval(()=>{
            WeatherAPI.getWeatherCurrent().then((response) => {
                    this.setState({ weatherCurrent: response.data })
                })
            WeatherAPI.getWeatherForecast().then((response) => {
                    this.setState({ weatherForecast: response.data.list.[1] })
                })
        },360000)
    }

    getWeather(result) {
        if (result == "Error") {
            return <div> {result} </div>
        }
        if (result.length === 0) {
            return <div> No data </div>
        }

        var weather = {
            temp: (Number(result.main.temp) - 273).toFixed(1),
            humidity: result.main.humidity,
            description: result.weather.[0].description,
            icon: result.weather.[0].icon,
        }

        return (
            <div>
                <div>Temp: {weather.temp}°c</div>
                <div>Humidity: {weather.humidity}%</div>
                <div>Description: {weather.description}</div>
                <img src={"../../static/images/" + WEATHER_ICON[weather.icon] + ".png"} width='100px'/>
            </div>
        );
    }

    render() {
        const weatherStyle = {
            textAlign: 'left',
            color: '#fff',
            padding: "10px",
        }

        return (
            <div id="weather" className={this.state.visible?'fadeIn':'fadeOut'} style={weatherStyle}>
                <h1 id="current">Now</h1>
                    {this.getWeather(this.state.weatherCurrent)}
                <h2 id="forecast">{moment(this.state.weatherForecast.['dt_txt']).format('HH:mm a')}</h2>
                    {this.getWeather(this.state.weatherForecast)}
            </div>
        );
    }
}

export default Weather;