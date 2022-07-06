const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=79ed6c7a857c65f5652bb7cbd4a227e6&page=1"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=79ed6c7a857c65f5652bb7cbd4a227e6&query=''"
const main = document.getElementById('main')
const form = document.getElementById('form')
const searchBox = document.getElementById('search') 



getMovies(API_URL)
async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    displayMovie(data.results)
}

function displayMovie(movies) {
    main.innerHTML = ""

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie
        
        const movieElements = document.createElement('div')

        movieElements.classList.add('movie') 

        movieElements.innerHTML =  `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3 class="movie-title">${title}</h3>
            <span class=${getVoteClass(vote_average)}>${vote_average}</span>
        </div>
        <div class="overview">
            <h2>Overview</h2>
            ${overview}
        </div> 
        `
        main.appendChild(movieElements)
    
    }) 
}

function getVoteClass(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}




form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchText = searchBox.value

    if(searchText && searchText !== '') {
        getMovies(SEARCH_API + searchText)

        searchBox.value = ""

    } else {
        window.location.reload()
    }
})