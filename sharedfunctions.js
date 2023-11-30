export function createMovieElement(movie, isAddButton = true) {
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
    spanYear.setAttribute("id", "metadata-year")
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
    
    if(isAddButton === true) {
        button.setAttribute("id", "metadata-btn")
        button.classList.add("add-btn", "metadata-small-text", "add-minus-btn-styling")
        button.innerText = "Watchlist"
    } else {
        button.setAttribute("id", "remove-btn")
        button.classList.add("remove-btn", "metadata-small-text", "add-minus-btn-styling")
        button.innerText = "Remove" 
    }

    button.setAttribute("type", "button")
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