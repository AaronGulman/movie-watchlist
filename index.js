// API key d3372d1b
const searchBtn = document.querySelector("#search-btn")
const searchResults = document.querySelector(".search-results")
const searchInput = document.querySelector("#search-bar")




searchBtn.addEventListener("click", async () => {
    const response = await fetch(`http://www.omdbapi.com/?apikey=d3372d1b&s=${searchInput.value}&type=movie`)
    const data = await response.json()
    const movieDetails = await Promise.all(data.Search.map(async movie => {              
        const extraMovieData = await moreMovieInfo(movie.imdbID)
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

    const movieImages = document.getElementsByClassName("movie-img")
    for (const image of movieImages) {
        image.addEventListener("error", (e) => {
            e.target.onerror = null
            e.target.src = "images/image-unavailable.svg"
            e.target.style.minHeight = "250px"
        })
    }

    // large_image.addEventListener('error',(e)=>{
    //     e.target.onerror = null;
    //     e.target.src = "data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.7577 11.7574C12.1483 11.3669 12.7814 11.3669 13.172 11.7574L16.0004 14.5859L18.8288 11.7574C19.2193 11.3669 19.8525 11.3669 20.243 11.7574C20.6336 12.148 20.6336 12.7811 20.243 13.1716L17.4146 16.0001L20.243 18.8285C20.6335 19.219 20.6335 19.8522 20.243 20.2427C19.8525 20.6332 19.2193 20.6332 18.8288 20.2427L16.0004 17.4143L13.172 20.2427C12.7814 20.6332 12.1483 20.6332 11.7577 20.2427C11.3672 19.8522 11.3672 19.219 11.7577 18.8285L14.5862 16.0001L11.7577 13.1716C11.3672 12.7811 11.3672 12.148 11.7577 11.7574Z' fill='%233A52EE'/%3E%3C/svg%3E%0A";
    //   });
    // movieImages.addEventListener("click", (e) => {
    // console.log(e.target)

        
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
