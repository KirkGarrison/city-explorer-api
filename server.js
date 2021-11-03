'use strict';


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');

const app = express(); 

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (request, response) => { response.send('Hello, it works!') })
// ./data/weather vs ./weather
app.get('./weather', handleGetWeather);
app.get('/*', (req, res) => res.status(404).send('that pathway was not found'))


function handleGetWeather(req, res) {
    console.log('weather route was hit');
    const cityName = req.query.city;
    const lat = req.query.lat;
    const lon = req.query.lon;
    console.log(req.query);
    try {
        const cityToSend = weather.find(city => {
            if((city.lat === lat && city.lon === lon) || city.city_name === cityName) {
                return true;
            }
            return false;
        });
        if (cityToSend) {
            const forcastData = cityToSend.data.map(city => new WeatherForcast(city));
            console.log(forcastData)
            res.status(200).send(forcastData)
        } else {
            res.status(404).send('city not found');
        }
    } catch (e) {
        res.status(500).send('server error');
    }
}

class WeatherForcast {
    constructor(obj) {
        this.min_temp = obj.min_temp;
        this.max_temp = obj.max_temp;
        this.description = obj.weather.description
    }
}

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));
