import {createMovieElement} from "./sharedfunctions.js"
const watchlistResults = document.querySelector("#watchlist-search-results")


window.addEventListener("load", (e) => {
    if(document.location.pathname === "/watchlist.html" && Object.keys(localStorage).length > 0) {
        watchlistResults.innerHTML = ""
        const savedMovies = retrieveMovies()
        for (const movie in savedMovies) {
            let movieInfo
            movieInfo = savedMovies[movie]
            watchlistResults.append(createMovieElement(movieInfo, false)[0])
            watchlistResults.append(createMovieElement(movieInfo, false)[1])
        }
    }
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





