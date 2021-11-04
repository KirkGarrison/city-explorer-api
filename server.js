'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherListing = require('./data/weather.json');

const app = express(); 

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (req, res) => res.status(200).send('hello'));
app.get('/weather', handleGetWeather);
// app.get('/movies', handleGetMovie);

async function handleGetWeather(req, res) {
    const {lat, lon } = req.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}lon=${lon}&key=${process.env.REACT_APP_WEATHER_KEY}&include=minutely`;
    const results = await axios.get(url);
    // console.log(results.data.data);
    const forecastData = results.data.data.map(forecast => new Forecast(forecast));
    res.status(200).send(forecastData);
}

class Forecast {
    constructor(obj) {
        this.date = obj.datetime;
        this.description = obj.description;
    }
}


app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));
