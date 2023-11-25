const searchBtn = document.querySelector("#search-btn")
const searchResults = document.querySelector(".search-results")
const searchInput = document.querySelector("#search-bar")

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
})

const movieButtons = document.getElementsByClassName("watchlist-btn")
for (const button of movieButtons) {
    button.addEventListener("click", (e) => {
        console.log(e.target)
    })
}

searchBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=d3372d1b&s=${searchInput.value}&type=movie`)
        const data = await response.json()
        
        if(data.Response === "False") {
            searchResults.innerHTML = ""
            const h3 = document.createElement("h3")
            const div = document.createElement("div")
            h3.style.color = "#DFDDDD"
            h3.innerText = "Unable to find what you’re looking for. Please try another search."
            div.append(h3)
            searchResults.append(div)

        } else {
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

        }
     
    } catch (error) {
       console.error("Error occurred: ", error)    
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
