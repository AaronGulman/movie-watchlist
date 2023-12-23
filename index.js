import { createMovieElement } from './sharedfunctions.js'
const searchBtn = document.querySelector('#search-btn')
const searchResults = document.querySelector('.search-results')
const searchInput = document.querySelector('#search-bar')

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    searchBtn.click()
  }
})

searchBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=d3372d1b&s=${searchInput.value}&type=movie`
    )
    const data = await response.json()

    if (data.Response === 'False') {
      searchResults.innerHTML = ''
      const h3 = document.createElement('h3')
      const div = document.createElement('div')
      h3.style.color = '#DFDDDD'
      h3.innerText =
        "Unable to find what you're looking for. Please try another search."
      div.append(h3)
      searchResults.append(div)
    } else {
      const movieDetails = await Promise.all(
        data.Search.map(async (movie) => {
          const extraMovieData = await moreMovieInfo(movie.imdbID)
          return {
            ...movie,
            ...extraMovieData,
          }
        })
      )

      searchResults.innerHTML = ''

      for (const movie of movieDetails) {
        let [movieEl, hrEl] = createMovieElement(movie, true)
        searchResults.append(movieEl, hrEl)
      }

      const movieImages = document.getElementsByClassName('movie-img')
      for (const image of movieImages) {
        image.addEventListener('error', (e) => {
          e.target.onerror = null
          e.target.src = 'images/image-unavailable.svg'
          e.target.style.minHeight = '250px'
        })
      }

      document.body.addEventListener('click', (e) => {
        if (e.target.id === 'metadata-btn') {
          let movieObj = {}
          let targetParent = e.target.closest('.movie-info')
          movieObj = {
            Title: targetParent.querySelector('#metadata-title').innerText,
            Year: targetParent.querySelector('#metadata-year').innerText,
            Genre: targetParent.querySelector('#metadata-genre').innerText,
            Plot: targetParent.querySelector('#metadata-plot').innerText,
            Runtime: targetParent.querySelector('#metadata-runtime').innerText,
            Poster: targetParent.querySelector('.movie-img').src,
            imdbID: targetParent.getAttribute('data-movie-id'),
          }
          addToWatchlist(movieObj.imdbID, movieObj)
          const closestSpan = e.target.querySelector('.clicked-span')
          console.log(closestSpan)
          closestSpan.classList.remove('animate-in', 'animate-out')
          void closestSpan.offsetWidth

          closestSpan.classList.add('animate-in')

          setTimeout(() => {
            closestSpan.classList.remove('animate-in')
            closestSpan.classList.add('animate-out')
          }, 2000)
        }
      })
    }
  } catch (error) {
    console.error('Error occurred: ', error)
  }
})

async function moreMovieInfo(imdbID) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=d3372d1b&i=${imdbID}`
  )
  const movieData = await response.json()
  const extraMovieData = {
    Genre: movieData.Genre,
    Plot: movieData.Plot,
    Runtime: movieData.Runtime,
  }

  return extraMovieData
}

function addToWatchlist(movieID, movieObj) {
  if (localStorage.getItem(movieID) === null) {
    localStorage.setItem(movieID, JSON.stringify(movieObj))
  }
}
