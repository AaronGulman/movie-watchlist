window.addEventListener("load", (e) => {
    if(document.location.pathname === "/watchlist.html") {
        console.log(document.location.pathname)
        //Insert function that grabs objects from localStorage
    }
})

//Create function that grabs movie objects from localStorage  
function retrieveMovies() {
    let movieObj = {}
    for (const movie in localStorage) {
        if (localStorage.hasOwnProperty(movie)) {
            movieObj[movie] = JSON.parse(localStorage.getItem(movie))
        }
    }
    console.log(movieObj)
    return movieObj
}

function renderMovies(movie) {
    
}


