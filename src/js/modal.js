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
    const selectedMovie = e.target.closest('li');
    const selectedMovieId = Number(selectedMovie.getAttribute('data-id'));

    spinner.enable();

    getFilmDetails(selectedMovieId)
    .then(response => {
        modalMovieToggle();
        addModalMovieListeners();
        spinner.disable();
        return response;
    })
    .catch(error => console.log(error));
  }
}

function onCloseModalMovie(e) {
  e.preventDefault();

  const isContainsClass =
    e.target.classList.contains('close-btn__icon') ||
    e.target.parentNode.classList.contains('close-btn__icon');

  if (e.code === 'Escape' || isContainsClass || e.target === backdrop) {
    modalMovieToggle();
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
