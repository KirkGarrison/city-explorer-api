'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const handleGetWeather = require('./Weather/weather')
const handleGetMovie = require('./Movies/movie')
const app = express(); 

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (req, res) => res.status(200).send('hello'));
app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovie);

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));
