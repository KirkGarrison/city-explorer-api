const axios = require('axios');


async function handleGetMovie(req, res) {
    const { query } = req.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
    const results = await axios.get(url);
    const movieData = results.data.results.map(movies => new Movies(movies));
    console.log(movieData);
    res.status(200).send(movieData);
}
class Movies {
    constructor (obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.image = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
    }
}
module.exports = handleGetMovie;