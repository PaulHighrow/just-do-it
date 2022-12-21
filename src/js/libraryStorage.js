const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const noFilmsMessage = document.querySelector('.alert__message');
const queueButton = document.querySelector('.queue_button');
const watchedButton = document.querySelector('.watched_button');
export const libraryEl = document.querySelector('.library');
let isWatchTabActive = true;

// console.log(libraryEl);
if (libraryEl) {
  watchedButton.addEventListener('click', handleClickWatched);
  queueButton.addEventListener('click', handleClickQueue);
}

// isLocalStorageEmpty('watch');
// isLocalStorageEmpty('queue');

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

export function localStorageFunction(movieData) {
  const filmObject = JSON.stringify(movieData);
  const isLibraryPage = location.pathname.includes('library');
  const cartItem = document.querySelector(`[data-id="${movieData.id}"]`);

  const watchBtn = document.querySelector('[data-action="watch"]');
  const queueBtn = document.querySelector('[data-action="queue"]');

  watchBtn.addEventListener('click', addWatch);
  queueBtn.addEventListener('click', addQueue);

  // console.log(localStorage.getItem('watch').includes(filmObject));

  if (localStorage.getItem('watch').includes(filmObject)) {
    watchBtn.classList.add('button--accent-btn');
    watchBtn.textContent = 'REMOVE FROM WATCHED';
  }

  if (localStorage.getItem('queue').includes(filmObject)) {
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
  if (!getFromStorage(name)) {
    // renderSavedFilms(name);
    if (libraryEl) {
      noFilmsMessage.classList.remove('visually-hidden');
    }

    return;
  }
}

renderSavedFilms('watch');
// addPaginationGallery();
export function handleClickQueue() {
  renderSavedFilms('queue');
  // removeDisabled(watchedButton);
  // setDisabled(queueButton);
  isWatchTabActive = false;
}

export function handleClickWatched() {
  renderSavedFilms('watch');
  // setDisabled(watchedButton);
  // removeDisabled(queueButton);
  isWatchTabActive = true;
}

export function renderSavedFilms(name) {
  clearFilmList();
  const storageMovies = getFromStorage(name);
  if (storageMovies) {
    renderLibrary(storageMovies);
    if (noFilmsMessage) {
      noFilmsMessage.classList.add('visually-hidden');
    }
  } else {
    if (noFilmsMessage) {
      noFilmsMessage.classList.remove('visually-hidden');
    }
  }
}

// function setDisabled(el) {
//   console.log(el);
//   el.setAttribute('disabled', '');
//   el.classList.add('button-active');
// }

// function removeDisabled(el) {
//   console.log(el);
//   el.removeAttribute('disabled');
//   el.classList.remove('button-active');
// }

function clearFilmList() {
  if (libraryEl) {
    libraryEl.innerHTML = '';
  }
  // noFilmsMessage.classList.remove('visually-hidden');
}

function renderLibrary(storageContent) {
  const markup = storageContent
    .map(({ id, poster_path, title, genres, release_date }) => {
      return `<li class="gallery__item" data-id="${id}">
    <a href="#" class="gallery__link" data-id="${id}"><div class="gallery__thumb">
    <img class="gallery__img" id="${id}" src="${IMG_URL + poster_path}
    "alt="${title}" /></div><div class="gallery__descr">
    <h2 class="gallery__title">${title}</h2>
    <p class="gallery__text">${genres
      .map(({ name }) => name)
      .join(', ')} | ${release_date.slice(0, 4)}</p>
    </div></a></li>`;
    })
    .join('');

  if (libraryEl) {
    libraryEl.innerHTML = markup;
  }
}
