import { getFilmDetails } from './fetchaAPI';
import Spinner from './spinner';

const spinner = new Spinner();

const galleryEl = document.querySelector('.gallery');
const modalMovie = document.querySelector('.modal');
const backdrop = document.querySelector('.backdrop');

galleryEl.addEventListener('click', onMovieCardClick);

function onMovieCardClick(e) {
  e.preventDefault();

  if (e.target !== e.currentTarget) {
    const selectedMovie = e.target.closest('.gallery__item');
    const selectedMovieId = Number(selectedMovie.getAttribute('data-id'));

    spinner.enable();

    getFilmDetails(selectedMovieId)
    .then(response => {
      modalMovieToggle();
      modalMovie.innerHTML = renderMovieInfo(response);
      addModalMovieListeners();
      spinner.disable();
      return response;
    })
      
    .catch(error => console.log(error));
  }
}

function onCloseModalMovie(e) {
  e.preventDefault();

  const isContainsClass = e.target.classList.contains('close-btn__icon') || e.target.parentNode.classList.contains('close-btn__icon');

  if (e.code === 'Escape' || isContainsClass || e.target === backdrop) {
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
    <svg class="close-btn__icon" width="30" height="30">
      <use href="./images/sprite.svg#icon-close"></use>
    </svg>
  </button>

  <div class= "modalMovie__tabl-group">
    <img
      class="modalMovie__img"
      src="${poster_path === null ? noPosterImg : BASE_IMG_URL + poster_path}"
      alt="${original_title + ' poster'}"
    />
  </div>
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
      <li class="class="modalMovie__data-item">
          <p class="modalMovie__data-title">Popularity</p>
          <p class="modalMovie__data-value">${popularity.toFixed(1)}</p>
      </li>
      <li class="class="modalMovie__data-item">
          <p class="modalMovie__data-title">Original Title</p>
          <p class="modalMovie__data-value">${original_title}</p>
      </li>
      <li class="class="modalMovie__data-item">
          <p class="modalMovie__data-title">Genre</p>
          <p class="modalMovie__data-value">${genresString}</p>
      </li>
    </ul>
    
      <h2 class="modalMovie__description-title">About</h2>
      <p class="modalMovie__description-text">${overview}</p>
      <button class="btn-modal btn-modal-watched" type="button">
        add to Watched
      </button>
      <button class="btn-modal btn-modal-queue" type="button">
        add to queue
      </button>
    </ul>
  </div>`;
}


function clearModalMovieInfo() {
  modalMovie.innerHTML = '';
}