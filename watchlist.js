import {createMovieElement} from "./sharedfunctions.js"
const watchlistResults = document.querySelector("#watchlist-search-results")

window.addEventListener("load", (e) => {
    if(document.location.pathname === "/watchlist.html" && Object.keys(localStorage).length > 0) {
        renderMovies(watchlistResults)
    } 
     
    document.body.addEventListener("click", (e) => {
        if(e.target.id === "remove-btn") {
            const targetParent = e.target.closest(".movie-info")  
            const movieID = {
                imdbID: targetParent.getAttribute("data-movie-id")
            }

            if(localStorage.length === 1) {
                localStorage.removeItem(movieID.imdbID)
                renderMovies(watchlistResults)

                const p = document.createElement("p")
                p.innerText = "Your watchlist is looking a little empty..."

                const a = document.createElement("a")
                a.setAttribute("href", "index.html")

                const button = document.createElement("button")
                button.innerText = "Let's add some movies!"
                button.setAttribute("id", "watchlist-page-btn")
                button.classList.add("add-btn", "add-minus-btn-styling")
                button.setAttribute("type", "button")

                a.append(button)
                watchlistResults.append(p)
                watchlistResults.append(a)
            } else {
                localStorage.removeItem(movieID.imdbID)
                renderMovies(watchlistResults)
            }
        }
    })
})


function retrieveMovies() {
    let movieObj = {}
    for (const movie in localStorage) {
        if (localStorage.hasOwnProperty(movie)) {
            movieObj[movie] = JSON.parse(localStorage.getItem(movie))
        }
    }
    return movieObj
}


function renderMovies(renderLocation) {
    renderLocation.innerHTML = ""
    const savedMovies = retrieveMovies()
    for (const movie in savedMovies) {
        let movieInfo
        movieInfo = savedMovies[movie]
        renderLocation.append(createMovieElement(movieInfo, false)[0])
        renderLocation.append(createMovieElement(movieInfo, false)[1])
    }
}