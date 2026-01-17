//Titles: https://omdbapi.com/?s=godzilla&page=1&apikey=4e75cc56
//Details: https://omdbapi.com/?i=tt0831387&apikey=4e75cc56

const movieList = document.querySelector('.movies');
const searchInput = document.getElementById('search__movies');

// Array of popular movies to show when you first open the application
const allPopularMovies = [
    'avengers', 'batman', 'spider-man', 'inception', 'interstellar', 'joker',
    'iron man', 'thor', 'deadpool', 'wolverine', 'superman', 'wonder woman',
    'avatar', 'titanic', 'gladiator', 'matrix', 'star wars', 'jurassic park',
    'harry potter', 'lord of the rings', 'fast and furious', 'transformers'
];

// Function to get 6 random movies from the list
function getRandomMovies(arr, count = 6) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5); //Mixes the objects in the array and spits out 6 random movies out.
    return shuffled.slice(0, count);
}

const popularMovies = getRandomMovies(allPopularMovies);

// Load initial popular movies
async function loadInitialMovies() {
    movieList.innerHTML = '<p style="color: white; text-align: center;">Loading movies...</p>';
    
    try {
        const moviePromises = popularMovies.map(movie => 
            fetch(`https://omdbapi.com/?s=${movie}&page=1&apikey=4e75cc56`)
                .then(res => res.json())
        );
        
        const results = await Promise.all(moviePromises);
        
        const movies = results
            .filter(data => data.Response === "True")
            .map(data => data.Search[0])
            .filter(movie => movie);
        
        if (movies.length > 0) {
            movieList.innerHTML = movies.map(movie => movieHTML(movie)).join('');
        } else {
            movieList.innerHTML = '<p style="color: white; text-align: center;">No movies found.</p>';
        }
    } catch (error) {
        console.error('Error loading initial movies:', error);
        movieList.innerHTML = '<p style="color: white; text-align: center;">Error loading movies. Please try again.</p>';
    }
}

//Search for a specific type of Movie based on your search
async function renderMovies(searchTerm) {
    movieList.innerHTML = '<p style="color: white; text-align: center;">Searching...</p>';
    
    try {
        const res = await fetch(`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=4e75cc56`);
        const data = await res.json();
        
        if (data.Response === "True") {
            movieList.innerHTML = data.Search.map((movie) => movieHTML(movie)).join('');
        } else {
            movieList.innerHTML = '<p style="color: white; text-align: center;">No movies found. Try another search!</p>';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        movieList.innerHTML = '<p style="color: white; text-align: center;">Error loading movies. Please try again.</p>';
    }
}

// Function to handle search
function findMovies() {
    const searchTerm = searchInput.value.trim(); //Searches for any object that has a similar title to what it being searched
    if (searchTerm) {
        renderMovies(searchTerm);
    } else {
        //If there is no movies, then displays the initial movies
        loadInitialMovies();
    }
}

// A event listener for when the user hits the enter key
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        findMovies();
    }
});

loadInitialMovies(); //Every time the website loads, 6 random movies are displayed

function showMovie(id) {
    localStorage.setItem("id", id);
    window.location.href = `${window.location.origin}/movie.html`; //Saves the movies id and carries it over to the new page.
}

function movieHTML(movie) {
    return `
        <div class="movie">
            <figure class="movie__poster--wrapper" onclick="showMovie('${movie.imdbID}')">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" alt="${movie.Title}" class="movie__poster">
            </figure>
            <h1 class="movie__title">${movie.Title}</h1>
            <div class="movie__info">
                <p class="movie__date">Year: ${movie.Year}</p>
            </div>
            <button class="btn" onclick="showMovie('${movie.imdbID}')">Get Tickets</button>
        </div>
    `
}