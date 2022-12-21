import FetchApi from './fetchAPI';
import { localStorageFunction, libraryEl } from './libraryStorage';
import Spinner from './spinner';
import { trailerBtnListener } from './trailer';
const movie = new FetchApi();
const spinner = new Spinner();

const galleryEl = document.querySelector('.gallery');
const modalMovie = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

if (galleryEl) {
  galleryEl.addEventListener('click', onMovieCardClick);
}

if (libraryEl) {
  libraryEl.addEventListener('click', onMovieCardClick);
}

function onMovieCardClick(e) {
  e.preventDefault();

  if (e.target !== e.currentTarget) {
    const selectedMovie = e.target.closest('.gallery__link');

    const selectedMovieId = Number(selectedMovie.getAttribute('data-id'));

    spinner.enable();
    // console.log(movie);
    movie
      .getFilmDetails(selectedMovieId)
      .then(response => {
        // console.log(response);
        modalMovieToggle();
        modalMovie.innerHTML = renderMovieInfo(response);
        addModalMovieListeners();
        // const watchBtn = document.querySelector('[data-action="watch"]');
        // const queueBtn = document.querySelector('[data-action="queue"]');

        trailerBtnListener(selectedMovieId);
        spinner.disable();
        return response;
      })
      .then(response => {
        localStorageFunction(response);
      })
      .catch(error => console.error(error));
  }
}

function onCloseModalMovie(e) {
  e.preventDefault();

  const isContainsClass =
    e.target.classList.contains('close-btn__icon') ||
    e.target.parentNode.classList.contains('close-btn__icon');

  if (e.code === 'Escape' || isContainsClass || e.target === backdrop) {
    // localStorageFunction();
    modalMovieToggle();
    clearModalMovieInfo();
    removeModalMovieListeners();
  }
}

function modalMovieToggle() {
  backdrop.classList.toggle('is-hidden');
  modalMovie.classList.toggle('is-hidden');
  document.body.classList.toggle('modal-open');
}

function addModalMovieListeners() {
  backdrop.addEventListener('click', onCloseModalMovie);
  window.addEventListener('keydown', onCloseModalMovie);
  modalMovie.addEventListener('click', onCloseModalMovie);
}

function removeModalMovieListeners() {
  backdrop.removeEventListener('click', onCloseModalMovie);
  window.removeEventListener('keydown', onCloseModalMovie);
  modalMovie.removeEventListener('click', onCloseModalMovie);
}

function renderMovieInfo({
  poster_path,
  title,
  genres,
  popularity,
  vote_count,
  vote_average,
  original_title,
  overview,
}) {
  const genresString = genres.map(genre => genre.name).join(', ');
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500/';
  const noPosterImg =
    'https://sd.keepcalms.com/i/sorry-no-picture-available-2.png';

  return `<button class="btn close-btn" type="button">
    <svg class="close-btn__icon" width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.733 10.304l-1.504-1.504-5.963 5.963-5.963-5.963-1.504 1.504 5.963 5.963-5.963 5.963 1.504 1.504 5.963-5.963 5.963 5.963 1.504-1.504-5.963-5.963 5.963-5.963z"></path>
    </svg>
  </button>

  <div class= "modalMovie__tabl-group">
    <img
      class="modalMovie__img"
      src="${poster_path === null ? noPosterImg : BASE_IMG_URL + poster_path}"
      alt="${original_title + ' poster'}"
    />
 
  <div class="modalMovie__description-group">
    <h2 class="modalMovie__title">${title}</h2>
    <ul class="modalMovie__data-list">
      <li class="modalMovie__data-item">
          <p class="modalMovie__data-title">Vote / Votes</p>
          <p class="modalMovie__data-value">

            <span class="modalMovie__vote-value">${vote_average.toFixed(
              1
            )}</span> /

            <span class="modalMovie__votes-value">${vote_count}</span>
          </p>
      </li>
      <li class="modalMovie__data-item">
          <p class="modalMovie__data-title">Popularity</p>
          <p class="modalMovie__data-value">${popularity.toFixed(1)}</p>
      </li>
      <li class="modalMovie__data-item">
          <p class="modalMovie__data-title">Original Title</p>
          <p class="modalMovie__data-value">${original_title}</p>
      </li>
      <li class="modalMovie__data-item">
          <p class="modalMovie__data-title">Genre</p>
          <p class="modalMovie__data-value">${genresString}</p>
      </li>
    </ul>
    
      <h2 class="modalMovie__description-title">About</h2>
      <p class="modalMovie__description-text">${overview}</p>

      <div class="btn__modal-group">
      <button class="btn-modal btn-modal-watched" type="button" data-action="watch">
        add to Watched
      </button>
      <button class="btn-modal btn-modal-queue" type="button" data-action="queue">
        add to queue
      </button>
      </div>
      <div class="trailerBtnWrap">
  <button class="trailer-btn">WATCH TRAILER</button>
</div>
      </div>
   </div>
  </div>`;
}

function clearModalMovieInfo() {
  modalMovie.innerHTML = '';
}
