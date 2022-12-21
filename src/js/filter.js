import FetchApi from './fetchAPI';
import Spinner from './spinner';

import axios from 'axios';
import { getGenres } from './themoviedb.js';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const form = document.querySelector('.search__form');

const refs = {
  genresList: document.querySelector('.genres'),
  filterNavBtn: document.querySelector('.navigation__filter'),
  gallery: document.querySelector('.gallery'),
};

// console.log(refs.genresList);
// console.log(refs.filterNavBtn);

const showGenreFilter = () => refs.genresList.classList.toggle('genres--shown');

refs.filterNavBtn.addEventListener('click', showGenreFilter);
refs.genresList.addEventListener('click', sortByGenre);

let trendFilmsList = [];
let genre = 4;
let page = 1;

async function sortByGenre(elem) {
  elem.preventDefault();
  form.reset();

  if (!elem.target.id) {
    return;
  }

  genre = Number(elem.target.id);
  // console.log(Number(elem.target.id));
  await fetchGenres(page, genre).then(data => {
    trendFilmsList = [];
    data.results.forEach(movie => {
      let movieData = {
        id: movie.id,
        poster: movie.poster_path,
        title: movie.original_title,
        genres: movie.genre_ids,
        year: movie.release_date.slice(0, 4),
        vote: movie.vote_average.toFixed(1),
      };
      trendFilmsList.push(movieData);
    });
  });
  await getGenres()
    .then(({ genres }) => {
      trendFilmsList.forEach(movie => {
        movie.genres = movie.genres.map(id => {
          genres.forEach(obj => {
            if (obj.id === id) {
              id = obj.name;
            }
          });
          return id;
        });
        switch (true) {
          case movie.genres.length > 0 && movie.genres.length <= 2:
            movie.genres = movie.genres.join(', ');
            break;

          case movie.genres.length > 2:
            movie.genres[2] = 'Other';
            movie.genres = movie.genres.slice(0, 3).join(', ');
            break;

          default:
            movie.genres = 'Genre N/A';
            break;
        }
      });
    })
    .catch(error => {
      console.log('Failed to get genres : ', error);

      trendFilmsList.map(movie => (movie.genres = 'Genres N/A'));
    });
  refs.gallery.innerHTML = trendFilmsList
    .map(({ id, poster, title, genres, year, vote }) => {
      return `<li class="gallery__item">
      <a href="#" class="gallery__link" data-id="${id}">
      <div class="gallery__thumb">
      <img class="gallery__img" id="${id}" src="${IMG_URL + poster}
      "alt="${title}" />
      </div>
      <div class="gallery__descr">
      <h2 class="gallery__title">${title}</h2>
      <p class="gallery__text">${genres} | ${year}</p>
      </div></a></li>`;
    })
    .join('');
}

async function fetchGenres(page, genre) {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=e146a7a5146c0f8a3c3cd99167c5b659&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genre}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`an error occurred` + error);
  }
}
