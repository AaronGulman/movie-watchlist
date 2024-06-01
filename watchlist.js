import { createMovieElement } from './sharedfunctions.js';
const watchlistResults = document.querySelector('#watchlist-search-results');

window.addEventListener('load', (e) => {
  console.log('Window loaded');
  if (document.title === 'Movie Watchlist' && Object.keys(localStorage).length > 0) {
    console.log('Rendering movies on page load');
    renderMovies(watchlistResults);
  }

  document.body.addEventListener('click', (e) => {
    if (e.target.id === 'remove-btn') {
      console.log('Remove button clicked');
      const targetParent = e.target.closest('.movie-info');
      const movieID = targetParent.getAttribute('data-movie-id');
      console.log(`Removing movie with ID: ${movieID}`);

      localStorage.removeItem(movieID);
      renderMovies(watchlistResults);

      if (Object.keys(localStorage).length === 0) {
        console.log('Local storage is empty after removal');
        showEmptyWatchlistMessage();
      }
    }
  });
});

function retrieveMovies() {
  let movieObj = {};
  Object.keys(localStorage).forEach(key => {
    try {
      movieObj[key] = JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(`Error parsing localStorage item ${key}:`, error);
    }
  });
  console.log('Retrieved movies from localStorage:', movieObj);
  return movieObj;
}

function renderMovies(renderLocation) {
  renderLocation.innerHTML = '';
  const savedMovies = retrieveMovies();
  Object.values(savedMovies).forEach(movieInfo => {
    const movieElements = createMovieElement(movieInfo, false);
    console.log('Appending movie elements:', movieElements);
    renderLocation.append(movieElements[0]);
    renderLocation.append(movieElements[1]);
  });
}

function showEmptyWatchlistMessage() {
  const p = document.createElement('p');
  p.innerText = 'Your watchlist is looking a little empty...';

  const a = document.createElement('a');
  a.setAttribute('href', 'index.html');

  const button = document.createElement('button');
  button.innerText = "Let's add some movies!";
  button.setAttribute('id', 'watchlist-page-btn');
  button.classList.add('add-btn', 'add-minus-btn-styling');
  button.setAttribute('type', 'button');

  a.append(button);
  watchlistResults.append(p);
  watchlistResults.append(a);
}
