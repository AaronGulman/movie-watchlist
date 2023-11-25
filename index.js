// API key d3372d1b
const searchBtn = document.querySelector("#search-btn")
const searchResults = document.querySelector(".search-results")
const searchInput = document.querySelector("#search-bar")

searchBtn.addEventListener("click", async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=d3372d1b&s=${searchInput.value}&type=movie`)
    const data = await response.json()
    const movieDetails = await Promise.all(data.Search.map(async movie => {              
        const extraMovieData = await moreMovieInfo(movie.imdbID)
        console.log(extraMovieData)
        return {
            ...movie,
            ...extraMovieData
        }
        
    }))

    searchResults.innerHTML = ""

    for (const movie of movieDetails) {
        const {Title, Year, Genre, Plot, Runtime, Poster} = movie

        let html = ""
        html = `
        <div class="movie-info">
            <img src="${Poster}" class="movie-img"> 
            <div class="movie-metadata">
                <div class="metadata-title-div">
                    <h3 id="metadata-title">${Title}</h3>
                    <span id="metadata-year" class="metadata-small-text">(${Year})</span>                
                </div>
                <div class="metadata-info-div">
                    <span id="metadata-time" class="metadata-small-text">${Runtime}</span>
                    <span id="metadata-genre"class="metadata-small-text">${Genre}</span>
                    <button id="metadata-button" class="watchlist-btn metadata-small-text" type="button">
                        <img src="images/add-icon.svg" alt="">
                        Watchlist
                    </button>
                </div>
                <p id="metadata-plot">${Plot}</p>
            </div> 
        </div>
        <div class="hr"></div>
        `
        searchResults.innerHTML += html
    }
        
})



async function moreMovieInfo(imdbID) {
    const response = await fetch(`http://www.omdbapi.com/?apikey=d3372d1b&i=${imdbID}`)
    const movieData = await response.json()
    const extraMovieData = {
        Genre: movieData.Genre, 
        Plot: movieData.Plot, 
        Runtime: movieData.Runtime
    }

    return extraMovieData
}
