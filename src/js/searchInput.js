import { apiService } from './themoviedb';
import { getGenres } from './themoviedb.js';

const NO_IMAGE = 'https://www.iitravel.com/images/no_preview.jpg';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const form = document.querySelector('.search__form');
const galleryEl = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');
const message = document.querySelector('.header__message');

const options = {
  root: null,
  rootMargin: '200px',
  treshhold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);

form.addEventListener('submit', onSearch);

let counter = 0;

function onLoad(entries, observer) {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('See');

      ApiService.getRequest().then(data => {
        counter += 1;
        renderGalleryinput(data);
        console.log(data);

        if (counter === data.total_pages) {
          observer.unobserve(guard);
          createMessageInputTwo();
        }
        console.log(data.total_pages);

        console.log(counter);
      });
    }
  });
}

const ApiService = new apiService();

function onClear() {
  galleryEl.innerHTML = '';
}

function onSearch(evn) {
  evn.preventDefault();
  // console.log(evn.currentTarget.elements.searchQuery.value);
  ApiService.searchQuery = evn.currentTarget.elements.searchQuery.value.trim();
  // console.log(ApiService.searchQuery);
  if (!ApiService.searchQuery) {
    // onClear();
    createMessageInput();
  }
  ApiService.resetPage();
  ApiService.getRequest().then(data => {
    console.log(data);
    if (data.total_pages === 0) {
      message.insertAdjacentHTML(
        'beforeend',
        `<div class="header__message-error">Search result not successful. Enter the correct movie name!</div>`
      );
      setTimeout(() => {
        message.innerHTML = '';
      }, 4000);
    }
    onClear();

    renderGalleryinput(data);
    observer.observe(guard);
  });
}
function renderGalleryinput(data) {
  let markup = '';
  data.results.forEach(
    ({ id, poster_path = NO_IMAGE, genre_ids, title, release_date }) => {
      let genresStr = getGenresSeach(genre_ids);
      let year = !release_date ? '' : release_date.substring(0, 4);
      if (genresStr && year) genresStr += ' | ';
      if (!title) title = 'no information';

      let newImg = !!poster_path ? IMG_URL + poster_path : NO_IMAGE;
      markup += `<li class="gallery__item">
    <a href="#" class="gallery__link" data-id="${id}"><div class="gallery__thumb">
      <img class="gallery__img" id="${id}" src="${newImg}
  "alt="${title}" /></div><div class="gallery__descr">
      <h2 class="gallery__title">${title}</h2>
      <p class="gallery__text">${genresStr}${year}</p>
    </div>  
    </a>
  </li>`;
    }
  );
  galleryEl.innerHTML = markup;

  galleryEl.insertAdjacentHTML('beforeend', markup);
}
let genresList;
function getGenresSeach(genreSet) {
  let genreStr = '';

  if (!genreSet) return '';
  genreSet.forEach(id => {
    for (const genre of genresList) {
      if (genre.id === id) genreStr += genre.name + ', ';
    }
  });

  return !genreStr ? '' : genreStr.substring(0, genreStr.length - 2);
}
getGenres().then(arr => {
  genresList = Array.from(arr.genres);
});

function createMessageInput() {
  message.insertAdjacentHTML(
    'beforeend',
    `<div class="header__message-error">Search result not successful. Enter the correct movie name!</div>`
  );
  setTimeout(() => {
    message.innerHTML = '';
  }, 4000);
}

function createMessageInputTwo() {
  message.insertAdjacentHTML(
    'beforeend',
    `<div class="header__message-error">We're sorry, but you've reached the end of search results.</div>`
  );
  setTimeout(() => {
    message.innerHTML = '';
  }, 7000);
}
