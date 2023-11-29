const searchBtn = document.querySelector("#search-btn")
const searchResults = document.querySelector(".search-results")
const searchInput = document.querySelector("#search-bar")

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
})

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
                let [movieEl, hrEl] = createMovieElement(movie)
                searchResults.append(movieEl, hrEl)
            }

            const movieImages = document.getElementsByClassName("movie-img")
            for (const image of movieImages) {
                image.addEventListener("error", (e) => {
                    e.target.onerror = null
                    e.target.src = "images/image-unavailable.svg"
                    e.target.style.minHeight = "250px"
                })
            }

            document.body.addEventListener("click", (e) => {
                if(e.target.id === "metadata-button") {
                   let movieObj = {}
                   let targetParent = e.target.closest(".movie-info")
                   movieObj = {
                        Title: targetParent.querySelector("#metadata-title").innerText,
                        Year: targetParent.querySelector("#metadata-year").innerText,
                        Genre: targetParent.querySelector("#metadata-genre").innerText,
                        Plot: targetParent.querySelector("#metadata-plot").innerText,
                        Runtime: targetParent.querySelector("#metadata-runtime").innerText,
                        Poster: targetParent.querySelector(".movie-img").src,
                        imdbID: targetParent.getAttribute("data-movie-id")
                   }

                   addToWatchlist(movieObj.imdbID, movieObj)
                }
            })

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


function addToWatchlist(movieID, movieObj) {
    if(localStorage.getItem(movieID) === null) {
        localStorage.setItem(movieID, JSON.stringify(movieObj))
    }
}


function createMovieElement(movie) {
    const {Title, Year, Genre, Plot, Runtime, Poster, imdbID} = movie

    const movieDiv = document.createElement("div")
    movieDiv.classList.add("movie-info")
    movieDiv.setAttribute("data-movie-id", imdbID)

    const img = document.createElement("img")
    img.classList.add("movie-img")
    img.src = Poster
    movieDiv.append(img)

    const metadataDiv = document.createElement("div")
    metadataDiv.classList.add("movie-metadata")

    const metadataTitleDiv = document.createElement("div")
    metadataTitleDiv.classList.add("metadata-title-div")
    const h3 = document.createElement("h3")
    h3.setAttribute("id", "metadata-title")
    h3.innerText = Title
    const spanYear = document.createElement("span")
    spanYear.classList.add("metadata-smalltext")
    spanYear.innerText = Year
    metadataTitleDiv.append(h3)
    metadataTitleDiv.append(spanYear)

    const metadataInfoDiv = document.createElement("div")
    metadataInfoDiv.classList.add("metadata-info-div")
    const spanRuntime = document.createElement('span')
    spanRuntime.setAttribute("id", "metadata-runtime")
    spanRuntime.classList.add("metadata-small-text")
    spanRuntime.innerText = Runtime
    const spanGenre = document.createElement("span")
    spanGenre.setAttribute("id", "metadata-genre")
    spanGenre.classList.add("metadata-small-text")
    spanGenre.innerText = Genre
    const button = document.createElement("button")
    button.setAttribute("id", "metadata-button")
    button.classList.add("watchlist-btn", "metadata-small-text")
    button.setAttribute("type", "button")
    button.innerText = "Watchlist"
    metadataInfoDiv.append(spanRuntime)
    metadataInfoDiv.append(spanGenre)
    metadataInfoDiv.append(button)

    const plot = document.createElement("p")
    plot.setAttribute("id", "metadata-plot")
    plot.innerText = Plot
  
    metadataDiv.append(metadataTitleDiv)
    metadataDiv.append(metadataInfoDiv)
    metadataDiv.append(plot)
  
    movieDiv.append(metadataDiv)

    const hrDiv = document.createElement("div")
    hrDiv.classList.add("hr")

    return [movieDiv, hrDiv]
}


