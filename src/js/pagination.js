// https://www.npmjs.com/package/tui-pagination#-documents

import Pagination from 'tui-pagination';
import apiService from './themoviedb';
import { trendingFilms } from './searchInput';
import {
  trendingFilmsList,
  getTrendingMovies,
  singleGenre,
} from './render-gallery';
import FetchApi from './fetchaAPI';

export const paginationOptions = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,

  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">:::</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">:::</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">...' +
      '<span class="tui-ico-ellip"></span>' +
      '</a>',
  },
};
export let pagination = new Pagination('pagination', paginationOptions);

//Pagination first start with response from API and create total_pages

export const paginationPage = pagination.getCurrentPage();

export function creatingTotalResultsPagination(res) {
  pagination.reset(res.data.results);
}

//Pagination change number of page, Fetch data and Render pages

export function paginationChangePageShowTrend() {
  pagination.on('afterMove', event => {
    //Current pagination page go to trendingFilms.page
    const currentPage = event.page;
    trendingFilmsList.page = currentPage;
    // console.log("trendingFilms.page", trendingFilms.page);

    // Rendering
    trendingFilms.getTrendingMovies().then(res => {
      //console.log("paginationOptions = ", paginationOptions)

      res.data.results.forEach(movie => {
        const {
          title,
          poster_path,
          id,
          vote_average,
          genre_ids,
          release_date,
        } = movie;
        // console.log(movie);

        renderMovieCard(
          id,
          poster_path,
          title,
          singleGenre,
          release_date,
          vote_average
        );
      });
    });
  });
}

export function paginationSearchFilms(res) {
  console.log(res.data);
  creatingTotalResultsPagination(res);
  setTimeout(changePaginationTheme, 100);
}

export function paginationChangePageSearchFilms() {
  pagination.on('afterMove', event => {
    //Current pagination page go to trendingFilms.page
    const currentPage = event.page;
    trendingFilms.page = currentPage;
    // console.log("trendingFilms.page", trendingFilms.page);
  });
}
