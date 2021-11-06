const axios = require('axios');
const cache = {}


function handleGetMovie(req, res) {
    const { query } = req.query;
    if (cache[query] && (Date.now() - cache[query].timestamp) < 10000)  {
        console.log('cache hit!' + query);
        res.status(200).send(cache[query]);
        return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&query=${query}&language=en-US&page=1&include_adult=false`

    axios
        .get(url)
        .then(results => {
            const movieData = results.data.results.map(movies => new Movies(movies));
            cache[query] = movieData;
            cache[query].timestamp = Date.now();
            console.log('cache miss!' + cache[query].timestamp);
            res.status(200).send(movieData);
        
        })
        .catch(err => {
            console.error('error', err);
            res.status(500).send('error', err);
        })
}

class Movies {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.image = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
    }
}
module.exports = handleGetMovie;
