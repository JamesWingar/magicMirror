import axios from "axios";

import { WEATHER_API, WEATHER_API_CITY, WEATHER_API_KEY } from "../constants/index"

class weatherService {

    getWeatherCurrent(){
        return axios.get(WEATHER_API +'weather?q=' + WEATHER_API_CITY + '&appid=' + WEATHER_API_KEY);
    }

    getWeatherForecast() {
        return axios.get(WEATHER_API +'forecast?q=' + WEATHER_API_CITY + '&appid=' + WEATHER_API_KEY);
    }
}

export default new weatherService()

