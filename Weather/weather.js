const axios = require('axios');
const cache = {}
 function handleGetWeather(req, res) {
    const { lat, lon } = req.query;

    if (cache[lat, lon] && (Date.now() - cache[lat, lon].timestamp) < 10000) {
        console.log('cache hit!' + lat, lon);
        res.status(200).send(cache[lat, lon]);
        return;
    }
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_KEY}&include=minutely`;

    axios
        .get(url)
        .then(results => {
            const forecastData = results.data.data.map(forecast => new Forecast(forecast));
            cache[lat, lon] = forecastData;
            cache[lat, lon].timestamp = Date.now();
            console.log('cache miss!' + cache[lat, lon].timestamp);
            res.status(200).send(forecastData);
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).send('error', err);
        })
 }

    class Forecast {
        constructor(obj) {
            this.date = obj.datetime;
            this.description = obj.weather.description;
        }
    }

    module.exports = handleGetWeather;
