const id = localStorage.getItem('id');
const movieList = document.querySelector('.movie__result');

async function main(id) {
    const res = await fetch(`http://omdbapi.com/?i=${id}&apikey=4e75cc56`);
    const data = await res.json();
    movieList.innerHTML = movieHTML(data); //It's only 1 object, so no need for an array of them
}

function movieHTML(movie) {
    return `
     <div class="single__movie--poster">
        <img src="${movie.Poster}" alt="movie poster" class="movie__poster">
    </div>
    <div class="single__movie--info">
        <h3 class="single__movie--title">${movie.Title}</h3>
        <ul class="single__movie__misc--info">
            <li class="single__movie--fact">Duration: ${movie.Runtime}</li>
            <li class="single__movie--fact">Rating: ${movie.Rated}</li>
            <li class="single__movie--fact">Released: ${movie.Released}</li>
        </ul>
        <p class="single__movie--fact">${movie.Genre}</p>
        <p class = "single__movie--fact"><b>Writer:</b> ${movie.Writer}</p>
        <p class = "single__movie--fact"><b>Actors: </b>${movie.Actors}</p>
        <p class = "single__movie--fact"><b>Plot:</b> ${movie.Plot}</p>
        <p class = "single__movie--fact"><b>Language:</b>${movie.Language}</p>
        <p class = "single__movie--fact"><b><i class = "fas fa-award"></i></b> ${movie.Awards}</p>
    </div>
    
    `;
}

main(id);