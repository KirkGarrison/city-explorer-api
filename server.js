'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherListing = require('./data/weather.json');

const app = express(); 

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (request, response) => { response.send('Hello, it works!') })
app.get('/data/weather', handleGetWeatherList);

function handleGetWeatherList(req, res) {
    req.query
    console.log('The shopping list route was hit!!!');
    res.status(200).send(weatherListing)
}

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));
