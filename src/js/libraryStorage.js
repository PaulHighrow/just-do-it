import { renderGallery } from './render-gallery';
import { galleryEl } from './render-gallery';

const noFilmsMessage = document.querySelector('.alert__message');
const queueButton = document.querySelector('.queue_button');
const watchedButton = document.querySelector('.watched_button');
const isWatchTabActive = true;

console.log(watchedButton);
console.log(galleryEl);

const addToStorage = (key, value) => {
  try {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
};

const getFromStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error(error);
  }
};

const removeFromStorage = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

function localStorageFunction(movieData) {
  const filmObject = JSON.stringify(movieData);
  const isLibraryPage = location.pathname.includes('library');
  const cartItem = document.querySelector(`[data-id="${movieData.id}"]`);

  const watchBtn = document.querySelector('[data-action="watch"]');
  const queueBtn = document.querySelector('[data-action="queue"]');

  watchBtn.addEventListener('click', addWatch);
  queueBtn.addEventListener('click', addQueue);

  if (
    localStorage.getItem('watch').includes(filmObject) &&
    localStorage.getItem('watch').length > 2
  ) {
    watchBtn.classList.add('button--accent-btn');
    watchBtn.textContent = 'REMOVE FROM WATCHED';
  }

  if (
    localStorage.getItem('queue').includes(filmObject) &&
    localStorage.getItem('queue').length > 2
  ) {
    queueBtn.classList.add('button--accent-btn');
    queueBtn.textContent = 'REMOVE FROM QUEUE';
  }

  function addWatch() {
    if (movieData) {
      let film = JSON.parse(localStorage.getItem('watch')) || [];
      if (film.find(e => e.id === movieData.id)) {
        watchBtn.classList.remove('button--accent-btn');
        watchBtn.textContent = 'ADD TO WATCHED';
        film = film.filter(e => e.id !== movieData.id);
        if (isLibraryPage && cartItem && isWatchTabActive) {
          cartItem.remove();
        }
      } else {
        watchBtn.classList.add('button--accent-btn');
        watchBtn.textContent = 'REMOVE FROM WATCHED';
        film.push(movieData);
      }
      localStorage.setItem('watch', JSON.stringify(film));
    }
    isLocalStorageEmpty('watch');
  }

  function addQueue() {
    if (movieData) {
      let film = JSON.parse(localStorage.getItem('queue')) || [];
      if (film.find(e => e.id === movieData.id)) {
        queueBtn.classList.remove('button--accent-btn');
        queueBtn.textContent = 'ADD TO QUEUE';
        film = film.filter(e => e.id !== movieData.id);

        if (isLibraryPage && cartItem && !isWatchTabActive) {
          cartItem.remove();
        }
      } else {
        queueBtn.classList.add('button--accent-btn');
        queueBtn.textContent = 'REMOVE FROM QUEUE';
        film.push(movieData);
      }
      localStorage.setItem('queue', JSON.stringify(film));
    }
    isLocalStorageEmpty('queue');
  }
}

function isLocalStorageEmpty(name) {
  if (getFromStorage(name).length === 0) {
    if (noFilmsMessage) {
      noFilmsMessage.classList.remove('visually-hidden');
    }
    return;
  }
}

watchedButton.addEventListener('click', handleClickWatched);
queueButton.addEventListener('click', handleClickQueue);

renderSavedFilms('watch');
addPaginationGallery();
function handleClickQueue() {
  renderSavedFilms('queue');
  removeDisabled(watchedButton);
  setDisabled(queueButton);
  isWatchTabActive = false;
}

function handleClickWatched() {
  renderSavedFilms('watch');
  setDisabled(watchedButton);
  removeDisabled(queueButton);
  isWatchTabActive = true;
}

function renderSavedFilms(name) {
  clearFilmList();
  const addedFilms = getFromStorage(name);
  if (addedFilms && addedFilms.length > 0) {
    renderGallery(addedFilms);
    noFilmsMessage.classList.add('visually-hidden');
  } else {
    noFilmsMessage.classList.remove('visually-hidden');
  }
}

function setDisabled(el) {
  el.setAttribute('disabled', '');
  el.classList.add('button-active');
}

function removeDisabled(el) {
  el.removeAttribute('disabled');
  el.classList.remove('button-active');
}

function clearFilmList() {
  galleryEl.innerHTML = '';
}

export { localStorageFunction };
