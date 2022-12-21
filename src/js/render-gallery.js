import { addPaginationGallery } from './pagination.js';
import { getGenres, getTrendingMovies } from './themoviedb.js';
import Spinner from './spinner';

const spinner = new Spinner();
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
export const galleryEl = document.querySelector('.gallery');

let trendFilmsList = [];
let page = 1;

if (galleryEl) {
  spinner.enable();
  renderGallery(page);
  addPaginationGallery();
}

export async function renderGallery(page) {
  await getTrendingMovies(page).then(data => {
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
      popularMoviesList.map(movie => (movie.genres = 'Genres N/A'));
    });

  const markup = trendFilmsList
    .map(({ id, poster, title, genres, year, vote }) => {
      return `<li class="gallery__item" data-id="${id}">
    <a href="#" class="gallery__link" data-id="${id}"><div class="gallery__thumb">
    <img class="gallery__img" id="${id}" src="${IMG_URL + poster}
    "alt="${title}" /></div><div class="gallery__descr">
    <h2 class="gallery__title">${title}</h2>
    <p class="gallery__text">${genres} | ${year}</p>
    </div></a></li>`;
    })
    .join('');

  galleryEl.innerHTML = markup;
  spinner.disable();
}
