// https://www.npmjs.com/package/tui-pagination#-documents

import Pagination from 'tui-pagination';

import { getTrendingMovies } from './themoviedb.js';
import { renderGallery } from './render-gallery.js';

export function addPaginationGallery() {
  const paginationOptions = {
    totalItems: 0,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,

    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">&#8811</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">&#8810</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        '<span class="tui-ico-ellip"></span>' +
        '</a>',
    },
  };

  let pagination = new Pagination(
    document.getElementById('pagination'), paginationOptions);

  //Pagination first start with response from API and create total_pages

  pagination.getCurrentPage();

  getTrendingMovies().then(data => {
    let total = data.total_results;
    console.log(total);
    pagination.reset(total);
  });

  //Pagination change number of page, Fetch data and Render pages
  pagination.on('afterMove', event => {
  //Current pagination page go to trendingFilms.page
  const currentPage = event.page;
  getTrendingMovies().then(data => {
    data.page = currentPage;
    console.log(currentPage);
    });
    renderGallery(currentPage);
  });
}
