import axios from 'axios';
import { getGenres } from './themoviedb.js';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const form = document.querySelector('.search__form');

const refs = {
  listButton: document.querySelector('.list-button'),
  gallery: document.querySelector('.gallery'),
  action: document.querySelector('.Action'),
  adventure: document.querySelector('.Adventure'),
  animation: document.querySelector('.Animation'),
  comedy: document.querySelector('.Comedy'),
  crime: document.querySelector('.Crime'),
  documentary: document.querySelector('.Documentary'),
  drama: document.querySelector('.Drama'),
  family: document.querySelector('.Family'),
  fantasy: document.querySelector('.Fantasy'),
  history: document.querySelector('.History'),
  horror: document.querySelector('.Horror'),
  music: document.querySelector('.Music'),
  mystery: document.querySelector('.Mystery'),
  romance: document.querySelector('.Romance'),
  scienceFiction: document.querySelector('.Science-fiction'),
  thriller: document.querySelector('.Thriller'),
  war: document.querySelector('.War'),
  western: document.querySelector('.Western'),
};
    

 



let trendFilmsList = [];
let genre = 4
let page = 1;
async function onSearch(elem) {
  elem.preventDefault();
  form.reset();
  
  genre = Number(elem.target.id)
console.log(Number(elem.target.id));
  await fetchGanres(page,genre).then(data => {
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
      //   popularMoviesList.map(movie => (movie.genres = 'Genres N/A'));
    });
  refs.gallery.innerHTML = trendFilmsList
    .map(({ id, poster, title, genres, year, vote }) => {
      return `<li class="gallery__item">
  <a href="#" class="gallery__link" data-id="${id}"><div class="gallery__thumb">
    <img class="gallery__img" id="${id}" src="${IMG_URL + poster}
"alt="${title}" /></div><div class="gallery__descr">
    <h2 class="gallery__title">${title}</h2>
    <p class="gallery__text">${genres} | ${year}</p>
  </div>  
  </a>
</li>`;
    })
    .join('');
}


async function fetchGanres(page, genre) {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=e146a7a5146c0f8a3c3cd99167c5b659&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}&with_genres=${genre}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`an error occurred` + error);
  }
}




refs.action.addEventListener('click', onSearch);
refs.adventure.addEventListener('click', onSearch);
refs.animation.addEventListener('click', onSearch);
refs.comedy.addEventListener('click', onSearch);
refs.crime.addEventListener('click', onSearch);
refs.documentary.addEventListener('click', onSearch);
refs.drama.addEventListener('click', onSearch);
refs.family.addEventListener('click', onSearch);
refs.fantasy.addEventListener('click', onSearch);
refs.history.addEventListener('click', onSearch);
refs.horror.addEventListener('click', onSearch);
refs.music.addEventListener('click', onSearch);
refs.mystery.addEventListener('click', onSearch);
refs.romance.addEventListener('click', onSearch);
refs.scienceFiction.addEventListener('click', onSearch);
refs.thriller.addEventListener('click', onSearch);
refs.war.addEventListener('click', onSearch);
refs.western.addEventListener('click', onSearch);