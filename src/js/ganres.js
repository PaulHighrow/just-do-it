import axios from 'axios';
import { getGenres } from './themoviedb.js';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const form = document.querySelector('.search__form');

const refs = {
  listButton: document.querySelector('.list-button'),
  gallery: document.querySelector('.gallery'),
  dropdownToggle: document.querySelectorAll('.dropdown-toggle'),
  buttonFilter: document.querySelectorAll('.button-filter')
};

refs.listButton.addEventListener('click', onSearch);

let trendFilmsList = [];
let page = 1;
let genre
async function onSearch(elem) {
  elem.preventDefault();
  form.reset();
if(!elem.target.id){
    return
}

  genre = Number(elem.target.id);
  console.log(Number(elem.target.id));
  await fetchGanres(page, genre).then(data => {
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




// let intervalId;

// refs.dropdownToggle.forEach(elem => {
//   elem.addEventListener('click', onStartMenu);
// });

// function onStartMenu(elem) {
//   const menu = elem.currentTarget.dataset.path;
//   document.querySelectorAll('.dropdown-menu').forEach(elem => {
//     if (
//       !document
//         .querySelector(`[data-target=${menu}]`)
//         .classList.contains('open')
//     ) {
//       elem.classList.remove('menu-active');
//       elem.classList.remove('open');

//       document
//         .querySelector(`[data-target=${menu}]`)
//         .classList.add('menu-active');
//       intervalId = setTimeout(() => {
//         document.querySelector(`[data-target=${menu}]`).classList.add('open');
//       }, 0);
//     }

//     if (
//       document.querySelector(`[data-target=${menu}]`).classList.contains('open')
//     ) {
//       clearTimeout(intervalId);
//       document
//         .querySelector(`[data-target=${menu}]`)
//         .classList.remove('menu-active');
//       intervalId = setTimeout(() => {
//         document
//           .querySelector(`[data-target=${menu}]`)
//           .classList.remove('open');
//       }, 0);
//     }

//     window.onclick = elem => {
//       if (
//         elem.target === document.querySelector(`[data-target=${menu}]`) ||
//         elem.target === document.querySelector(`[data-path=${menu}]`)
//       ) {
//         return;
//       } else {
//         document
//           .querySelector(`[data-target=${menu}]`)
//           .classList.remove('menu-active');
//         document
//           .querySelector(`[data-target=${menu}]`)
//           .classList.remove('open');
//       }
//     };
//   });

// }
