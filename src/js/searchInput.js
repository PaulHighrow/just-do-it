import Pagination from 'tui-pagination';
import { backToTop } from './pagination';
import { apiService } from './themoviedb';
import { getGenres } from './themoviedb.js';
import { renderGallery } from './render-gallery.js';
import { addPaginationGallery } from './pagination.js';

const NO_IMAGE = 'https://sd.keepcalms.com/i/sorry-no-picture-available-2.png';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const form = document.querySelector('.search__form');
const galleryEl = document.querySelector('.gallery');
const message = document.querySelector('.header__message');

form.addEventListener('submit', onSearch);

const ApiService = new apiService();
let page = 1;

function onClear() {
  galleryEl.innerHTML = '';
}

async function onSearch(evn) {
  evn.preventDefault();

  ApiService.searchQuery = form.elements.searchQuery.value.trim();

  if (!ApiService.searchQuery) {
    // console.log();
    createMessageInput();
    onClear();
    return;
  }

  const request = await ApiService.getRequest(page).then(data => {
    // console.log(data);
    renderGalleryinput(page);
    if (!data.total_pages) {
      createMessageInput();
      return;
    }
    onClear();

    const paginationOptions = {
      totalItems: 0,
      itemsPerPage: 20,
      visiblePages: 5,
      page: 1,
      centerAlign: true,
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage:
          '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
          '<span class="tui-ico-{{type}}"></span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
          '<span class="tui-ico-{{type}}"></span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
          '<span class="tui-ico-ellip"></span>' +
          '</a>',
      },
    };

    let pagination = new Pagination(
      document.getElementById('pagination'),
      paginationOptions
    );
    pagination.getCurrentPage();

    let total = data.total_results;
    pagination.reset(total);
    pagination.on('afterMove', event => {
      // Current pagination page go to trendingFilms.page
      let currentPage = event.page;
      ApiService.getRequest(page).then(data => {
        data.page = currentPage;
      });
      renderGalleryinput(currentPage);
    });
  });
}

function renderGalleryinput(page) {
  ApiService.getRequest(page).then(data => {
    let markup = '';
    data.results.forEach(
      ({ id, poster_path = NO_IMAGE, genre_ids, title, release_date }) => {
        let genresStr = getGenresSeach(genre_ids);
        let year = !release_date ? '' : release_date.substring(0, 4);
        if (genresStr && year) genresStr += ' | ';
        if (!title) title = 'no information';
        let newImg = !!poster_path ? IMG_URL + poster_path : NO_IMAGE;
        markup += `<li class="gallery__item">
          <a href="#" class="gallery__link" data-id="${id}">
          <div class="gallery__thumb">
          <img class="gallery__img" id="${id}" src="${newImg} "alt="${title}" />
          </div>
          <div class="gallery__descr">
          <h2 class="gallery__title">${title}</h2>
          <p class="gallery__text">${genresStr}${year}</p>
          </div>
          </a>
          </li>`;
      }
    );

    galleryEl.innerHTML = markup;
    backToTop();
  });
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

  renderGallery(1);
  addPaginationGallery();
}
