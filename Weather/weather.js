const axios = require('axios');

async function handleGetWeather(req, res) {
    const {lat, lon } = req.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_KEY}&include=minutely`;
    const results = await axios.get(url);
    const forecastData = results.data.data.map(forecast => new Forecast(forecast));
    res.status(200).send(forecastData);
}

class Forecast {
    constructor(obj) {
        this.date = obj.datetime;
        this.description = obj.weather.description;
    }
}

module.exports = handleGetWeather;